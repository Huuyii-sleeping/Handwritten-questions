async function delay(i) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(i);
}

for (let i = 1; i < 6; i++) {
  await delay(i);
}
