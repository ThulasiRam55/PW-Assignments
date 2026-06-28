function intersection(arr1, arr2) {
    let result = [];

    for (let i = 0; i < arr1.length; i++) {

        if (arr2.includes(arr1[i])) {

            if (!result.includes(arr1[i])) {
                result.push(arr1[i]);
            }
        }
    }

    return result;
}

console.log("Task 1: ", intersection([1, 2, 3, 4], [3, 4, 5, 6]));

console.log("Task 2: ", intersection([1, 2, 3], [4, 5, 6]));

console.log("Task 3: ", intersection([1, 2, 3], [1, 2, 3]));

console.log("Task 4: ", intersection([1, 2, 2, 3, 4], [2, 2, 4, 4, 5]));