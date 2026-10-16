# Concurrent API Fetcher

A Python and JavaScript project demonstrating the performance difference between sequential and concurrent HTTP requests using public JSON APIs.

## Features

- Fetches data from five public JSON endpoints.
- Compares sequential and concurrent execution.
- Python implementation using `asyncio`, `httpx`, and `asyncio.gather()`.
- JavaScript implementation using `fetch()` and `Promise.all()`.
- Measures execution time and calculates speedup.
- Handles failed requests without stopping the entire program.
- Includes request timeouts and retry logic in JavaScript.

## Technologies Used

- Python
- JavaScript
- HTTPX
- asyncio
- Node.js
- Promise.all()
- JSONPlaceholder REST API

## Project Structure

```text
concurrent-api-fetcher/
├── main.py
├── concurrent.js
├── requirements.txt
└── README.md
```

## Installation

Install Python dependencies:

```bash
python -m pip install -r requirements.txt
```

Node.js is required for the JavaScript implementation.

## Run the Python Version

```bash
python main.py
```

## Run the JavaScript Version

```bash
node concurrent.js
```

## How It Works

Sequential fetching waits for each request to finish before starting the next one.

Concurrent fetching starts multiple requests without waiting for each individual response. This can reduce total execution time when requests spend time waiting on network I/O.

The program measures both approaches and calculates the speedup.

## Sample Benchmark Results

Python:
- Sequential: 2.193 seconds
- Concurrent: 1.212 seconds
- Speedup: 1.81x

JavaScript:
- Sequential: 6.521 seconds
- Concurrent: 2.694 seconds
- Speedup: 2.42x

These are sample measurements from individual runs. Actual performance varies with network conditions and server response times.

## Learning Outcomes

- Understanding synchronous versus asynchronous execution.
- Working with REST APIs and JSON responses.
- Handling HTTP errors and timeouts.
- Implementing retries.
- Measuring performance using elapsed time.
- Comparing Python and JavaScript concurrency patterns.

## Future Improvements

- Retry only transient errors.
- Add exponential backoff.
- Export benchmark results to CSV or JSON.
- Display a summary table of successful and failed requests.
