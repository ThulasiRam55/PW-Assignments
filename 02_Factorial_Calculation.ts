function factorial(n: number): number {
    //For negative numbers
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }

    if (n <= 1) {
        return 1;
    }

    let result = 1;

    //factorial calculation
    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

//Function calls
//Positive input
console.log("Factorial of 0:", factorial(0));
console.log("Factorial of 1:", factorial(1));
console.log("Factorial of 5:", factorial(5));
console.log("Factorial of 7:", factorial(7));
console.log("Factorial of 9:", factorial(9));

//Negative input
try {
    console.log("Factorial of -3:", factorial(-3));
} catch (error) {
    console.log((error as Error).message);
}