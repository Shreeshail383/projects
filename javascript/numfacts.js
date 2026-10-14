const { performance } = require("node:perf_hooks");

function digitCount(n) {
    return Math.abs(n).toString().length;
}

function digitSum(n) {
    return Math.abs(n)
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0);
}

function divisors(n) {
    if (n === 0) return null;

    const result = [];
    const number = Math.abs(n);

    for (let i = 1; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            result.push(i);

            if (i !== number / i) {
                result.push(number / i);
            }
        }
    }

    return result.sort((a, b) => a - b);
}

function isPrime(n) {
    if (n < 2) return false;

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }

    return true;
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        const remainder = a % b;
        a = b;
        b = remainder;
    }

    return a;
}

function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a / gcd(a, b)) * b);
}

function primesInRange(start, end) {
    if (start > end) {
        throw new Error("Start must be less than or equal to end.");
    }

    if (end < 2) return [];

    const sieve = new Array(end + 1).fill(true);
    sieve[0] = false;
    sieve[1] = false;

    for (let p = 2; p <= Math.sqrt(end); p++) {
        if (sieve[p]) {
            for (let j = p * p; j <= end; j += p) {
                sieve[j] = false;
            }
        }
    }

    const primes = [];

    for (let n = Math.max(2, start); n <= end; n++) {
        if (sieve[n]) primes.push(n);
    }

    return primes;
}

function numberFacts(n) {
    console.log(`Number: ${n}`);
    console.log(`Digit count: ${digitCount(n)}`);
    console.log(`Digit sum: ${digitSum(n)}`);

    const result = divisors(n);

    if (result === null) {
        console.log("Divisors: undefined for 0");
    } else {
        console.log(`Divisors: ${JSON.stringify(result)}`);
    }

    console.log(`Prime: ${isPrime(n) ? "Yes" : "No"}`);
}

function main() {
    const args = process.argv.slice(2);

    if (args[0] === "--range") {
        if (
            args.length !== 3 ||
            !args.slice(1).every(arg => /^-?\d+$/.test(arg))
        ) {
            console.error("Usage: node numfacts.js --range <start> <end>");
            process.exitCode = 1;
            return;
        }

        const start = Number(args[1]);
        const end = Number(args[2]);

        if (
            !Number.isSafeInteger(start) ||
            !Number.isSafeInteger(end) ||
            end < 0 ||
            start > end
        ) {
            console.error("Invalid range.");
            process.exitCode = 1;
            return;
        }

        const startTime = performance.now();
        const primes = primesInRange(start, end);
        const elapsed = performance.now() - startTime;

        console.log(`Primes in range ${start}..${end}: ${JSON.stringify(primes)}`);
        console.log(`Elapsed: ${elapsed.toFixed(3)} ms`);
        return;
}

if (
    (args.length !== 1 && args.length !== 2) ||
    !args.every(arg => /^-?\d+$/.test(arg))
    ) {
        console.error("Please provide one or two integers.");
        process.exitCode = 1;
        return;
    }

    const numbers = args.map(Number);

    if (!numbers.every(Number.isSafeInteger)) {
        console.error("Please provide safe integers.");
        process.exitCode = 1;
        return;
    }

    const [a, b] = numbers;

    numberFacts(a);

    if (numbers.length === 2) {
        numberFacts(b);
        console.log(`GCD (${a}, ${b}): ${gcd(a, b)}`);
        console.log(`LCM (${a}, ${b}): ${lcm(a, b)}`);
    }
}

main();
