# Number-Facts CLI

A command-line application built using **Python** and **JavaScript (Node.js)** to analyze numbers and calculate useful mathematical facts.

## Features

- Count the digits in a number.
- Calculate the sum of its digits.
- Find all positive divisors.
- Check whether a number is prime.
- Calculate the GCD and LCM of two numbers.
- List prime numbers in a range using the Sieve of Eratosthenes.
- Measure prime-generation execution time.

## Project Structure

```text
week-01-number-facts/
├── python/
│   └── numfacts.py
├── javascript/
│   └── numfacts.js
└── README.md
```

## Requirements

- Python 3
- Node.js

## How to Run

### Python

Analyze one number:

```bash
python python/numfacts.py 360
```

Analyze two numbers:

```bash
python python/numfacts.py 84 36
```

Find primes between 1 and 100:

```bash
python python/numfacts.py --range 1 100
```

### JavaScript (Node.js)

Analyze one number:

```bash
node javascript/numfacts.js 360
```

Analyze two numbers:

```bash
node javascript/numfacts.js 84 36
```

Find primes between 1 and 100:

```bash
node javascript/numfacts.js --range 1 100
```

## Example Output

For the input `84 36`, the program calculates:

- GCD: `12`
- LCM: `252`

Both implementations should produce equivalent mathematical results.

## Time and Space Complexity

Let:
- `d` = number of digits.
- `n` = absolute value of the input number.
- `k` = number of divisors.
- `N` = upper bound of the prime range.

| Function | Time Complexity | Space Complexity |
|---|---|---|
| `digit_count` / `digitCount` | O(d) | O(d) |
| `digit_sum` / `digitSum` | O(d) | O(d) |
| `divisors` | O(√n + k log k) | O(k) |
| `is_prime` / `isPrime` | O(√n) | O(1) |
| `gcd` | O(log min(a, b)) | O(1) |
| `lcm` | O(log min(a, b)) | O(1) |
| `primes_in_range` / `primesInRange` | O(N log log N) | O(N) |
| `number_facts` / `numberFacts` | O(√n + k log k + d) | O(k + d) |

## Testing

Test both implementations with the same inputs, including:

- `360`
- `84 36`
- `0`
- `-17`
- `--range 1 100`

Check that both implementations produce matching results, excluding execution-time differences.

## Learning Goals

This project practices Python, JavaScript, command-line arguments, number theory, the Euclidean algorithm, the Sieve of Eratosthenes, and algorithm complexity analysis.
