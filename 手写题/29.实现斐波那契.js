function sum(n) {
  if (n <= 1) return n;
  return sum(n - 1) + sum(n - 2);
}

function sum1(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.log(sum1(10));
