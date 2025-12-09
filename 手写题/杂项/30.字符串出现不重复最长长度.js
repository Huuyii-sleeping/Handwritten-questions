function findMax(s) {
  let start = 0;
  let maxLength = 0;
  let seen = new Set();
  for (let i = 0; i < s.length; i++) {
    while (seen.has(s[i])) {
      seen.delete(s[start]);
      start++;
    }
    seen.add(s[i]);
    maxLength = Math.max(maxLength, i - start + 1);
  }
  return maxLength;
}

const s = "abcabcbb";  
console.log(findMax(s));