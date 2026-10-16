
import asyncio
import time
import httpx

URLS = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/users/1",
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/albums/1",
    "https://jsonplaceholder.typicode.com/comments/1",
]


async def fetch(client, url):
    try:
        response = await client.get(url, timeout=10)
        response.raise_for_status()
        return {"url": url, "data": response.json()}

    except (httpx.HTTPError, ValueError) as error:
        return {"url": url, "error": str(error)}


async def sequential_fetch(client):
    results = []

    for url in URLS:
        result = await fetch(client, url)
        results.append(result)

    return results


async def concurrent_fetch(client):
    return await asyncio.gather(
        *(fetch(client, url) for url in URLS)
    )


def show_results(results):
    for result in results:
        if "error" in result:
            print("FAILED:", result["url"], result["error"])
        else:
            print("SUCCESS:", result["url"])


async def main():
    async with httpx.AsyncClient() as client:
        start = time.perf_counter()
        sequential_results = await sequential_fetch(client)
        sequential_time = time.perf_counter() - start

        start = time.perf_counter()
        concurrent_results = await concurrent_fetch(client)
        concurrent_time = time.perf_counter() - start

    print("\n--- SEQUENTIAL RESULTS ---")
    show_results(sequential_results)
    print(f"Sequential time: {sequential_time:.3f} seconds")

    print("\n--- CONCURRENT RESULTS ---")
    show_results(concurrent_results)
    print(f"Concurrent time: {concurrent_time:.3f} seconds")

    if concurrent_time > 0:
        speedup = sequential_time / concurrent_time
        print(f"Speedup: {speedup:.2f}x")


if __name__ == "__main__":
    asyncio.run(main())
