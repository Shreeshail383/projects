
const { performance } = require("node:perf_hooks");

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/albums/1",
  "https://jsonplaceholder.typicode.com/comments/1",
];


async function fetchData(url) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return { url, data: await response.json() };
    } catch (error) {
      if (attempt === maxAttempts) {
        return {
          url,
          error: error.message,
          attempts: attempt,
        };
      }

      console.log(
        `Attempt ${attempt} failed for ${url}. Retrying...`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 500 * attempt)
      );
    }
  }
}


async function main() {
  // Sequential requests
  let start = performance.now();
  const sequential = [];

  for (const url of urls) {
    sequential.push(await fetchData(url));
  }

  const sequentialTime = performance.now() - start;

  // Concurrent requests
  start = performance.now();

  const concurrent = await Promise.all(
    urls.map((url) => fetchData(url))
  );

  const concurrentTime = performance.now() - start;

  console.log("\n--- SEQUENTIAL RESULTS ---");
  console.log(sequential);
  console.log(`Sequential time: ${(sequentialTime / 1000).toFixed(3)} seconds`);

  console.log("\n--- CONCURRENT RESULTS ---");
  console.log(concurrent);
  console.log(`Concurrent time: ${(concurrentTime / 1000).toFixed(3)} seconds`);

  if (concurrentTime > 0) {
    console.log(
      `Speedup: ${(sequentialTime / concurrentTime).toFixed(2)}x`
    );
  }
}

main();
