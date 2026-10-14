
import math
import sys
from time import perf_counter


def digit_count(n):
    return len(str(abs(n)))


def digit_sum(n):
    return sum(int(digit) for digit in str(abs(n)))


def divisors(n):
    n = abs(n)

    if n == 0:
        raise ValueError("Zero has infinitely many divisors.")

    result = []

    for i in range(1, math.isqrt(n) + 1):
        if n % i == 0:
            result.append(i)

            other = n // i
            if other != i:
                result.append(other)

    return sorted(result)


def is_prime(n):
    if n < 2:
        return False

    for i in range(2, math.isqrt(n) + 1):
        if n % i == 0:
            return False

    return True


def gcd(a, b):
    a, b = abs(a), abs(b)

    while b != 0:
        a, b = b, a % b

    return a


def lcm(a, b):
    if a == 0 or b == 0:
        return 0

    return abs((a // gcd(a, b)) * b)


def primes_in_range(start, end):
    if end < 2:
        return []

    sieve = [True] * (end + 1)
    sieve[0] = sieve[1] = False

    for p in range(2, math.isqrt(end) + 1):
        if sieve[p]:
            for multiple in range(p * p, end + 1, p):
                sieve[multiple] = False

    return [
        n for n in range(max(start, 2), end + 1)
        if sieve[n]
    ]


def number_facts(n):
    print(f"Number: {n}")
    print(f"Digit count: {digit_count(n)}")
    print(f"Digit sum: {digit_sum(n)}")

    if n == 0:
        print("Divisors: undefined for 0")
    else:
        print(f"Divisors: {divisors(n)}")

    print(f"Prime: {'Yes' if is_prime(n) else 'No'}")


def main():
    args = sys.argv[1:]

    if len(args) == 3 and args[0] == "--range":
        start, end = int(args[1]), int(args[2])

        start_time = perf_counter()
        primes = primes_in_range(start, end)
        elapsed = (perf_counter() - start_time) * 1000

        print(f"Primes in range {start}..{end}: {primes}")
        print(f"Elapsed: {elapsed:.3f} ms")
        return

    if len(args) not in (1, 2):
        print("Usage: python numfacts.py <number> [second_number]")
        print("       python numfacts.py --range <start> <end>")
        return

    numbers = [int(arg) for arg in args]
    number_facts(numbers[0])

    if len(numbers) == 2:
        a, b = numbers

        print(f"GCD ({a}, {b}): {gcd(a, b)}")
        print(f"LCM ({a}, {b}): {lcm(a, b)}")


if __name__ == "__main__":
    main()
