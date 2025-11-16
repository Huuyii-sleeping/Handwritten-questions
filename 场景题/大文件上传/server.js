const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs-extra"); // 增强版fs，支持递归创建目录等
const path = require("path");

const app = express();
app.use(cors()); // 允许跨域
app.use(express.json()); // 解析JSON请求体

// 配置存储：分片临时存储目录
const TEMP_DIR = path.join(__dirname, "temp"); // 临时存放分片
const UPLOAD_DIR = path.join(__dirname, "uploads"); // 最终上传目录
fs.ensureDirSync(TEMP_DIR); // 确保目录存在
fs.ensureDirSync(UPLOAD_DIR);

// 1. 配置multer接收分片文件
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 为每个文件创建独立目录（用fileMD5区分）
    const fileMD5 = req.body.fileMD5;
    const chunkDir = path.join(TEMP_DIR, fileMD5);
    fs.ensureDirSync(chunkDir);
    cb(null, chunkDir);
  },
  filename: (req, file, cb) => {
    // 分片文件名：index（确保按索引排序）
    cb(null, req.body.index); // 直接用分片索引作为文件名（如0、1、2...）
  },
});
const upload = multer({ storage });

// 2. 接收分片上传的接口
app.post("/upload", upload.single("chunk"), (req, res) => {
  console.log(`收到分片：${req.body.fileMD5}-${req.body.index}`);
  res.json({ code: 0, message: "分片上传成功" });
});

// 3. 查询已上传分片的接口
app.get("/query", async (req, res) => {
  const { fileMD5 } = req.query;
  const chunkDir = path.join(TEMP_DIR, fileMD5);

  // 如果目录不存在，说明没有上传过分片
  if (!fs.existsSync(chunkDir)) {
    return res.json({ uploadedChunks: [] });
  }

  // 读取目录下的所有分片文件（文件名即索引）
  const chunkFiles = await fs.readdir(chunkDir);
  // 转换为数字索引（如['0', '1'] → [0, 1]）
  const uploadedChunks = chunkFiles.map((name) => parseInt(name, 10));
  res.json({ uploadedChunks });
});

// 4. 合并分片的接口
app.post("/merge", async (req, res) => {
  const { fileMD5, totalChunks, fileName } = req.body;
  const chunkDir = path.join(TEMP_DIR, fileMD5);
  const targetPath = path.join(UPLOAD_DIR, fileName); // 合并后的文件路径

  try {
    // 4.1 校验所有分片是否齐全
    const chunkFiles = await fs.readdir(chunkDir);
    if (chunkFiles.length !== totalChunks) {
      return res.status(400).json({ code: 1, message: "分片不完整，无法合并" });
    }

    // 4.2 按索引排序分片（确保顺序正确）
    chunkFiles.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

    // 4.3 合并分片到目标文件
    for (const chunkIndex of chunkFiles) {
      const chunkPath = path.join(chunkDir, chunkIndex);
      // 追加分片内容到目标文件
      await fs.appendFile(targetPath, await fs.readFile(chunkPath));
      // 删除已合并的分片（节省空间）
      await fs.unlink(chunkPath);
    }

    // 4.4 合并完成后删除分片目录
    await fs.rmdir(chunkDir);

    console.log(`文件合并完成：${fileName}`);
    res.json({ code: 0, message: "文件合并成功", path: targetPath });
  } catch (err) {
    console.error("合并失败：", err);
    res.status(500).json({ code: 2, message: "合并失败" });
  }
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`后端服务器运行在 http://localhost:${PORT}`);
});
