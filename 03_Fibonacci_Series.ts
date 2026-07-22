function fibonacci(n: number): number {
    //Negative numbers
    if (n < 0) {
        throw new Error("Fibonacci is not defined for negative numbers.");
    }

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
//Positive input    
console.log("Fibonacci of 0:", fibonacci(0));
console.log("Fibonacci of 1:", fibonacci(1));
console.log("Fibonacci of 5:", fibonacci(5));
console.log("Fibonacci of 8:", fibonacci(8));
console.log("Fibonacci of 10:", fibonacci(10));
console.log("Fibonacci of 15:", fibonacci(15));

//Negative input
try {
    console.log("Fibonacci of -1:", fibonacci(-1));
} catch (error) {
    console.log((error as Error).message);
}