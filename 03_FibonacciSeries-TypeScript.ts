function fibonacci(n: number): number {
    if (n === 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    let first = 0;
    let second = 1;
    let next = 0;

    for (let i = 2; i <= n; i++) {
        next = first + second;
        first = second;
        second = next;
    }

    return second;
}

console.log(fibonacci(15));