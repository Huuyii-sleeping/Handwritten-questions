const items = [
  { id: 1, name: "Item 1", parentId: null },
  { id: 2, name: "Item 1.1", parentId: 1 },
  { id: 3, name: "Item 1.2", parentId: 1 },
  { id: 4, name: "Item 2", parentId: null },
  { id: 5, name: "Item 2.1", parentId: 4 },
];

function buildTree(items, parentId = null) {
  let tree = [];
  for (const i in items) {
    if (items[i].parentId === parentId) {
      const children = buildTree(items, items[i].id);
      if (children.length) {
        items[i].children = children;
      }
      tree.push(items[i])
    }
  }
  return tree
}

console.log(buildTree(items))