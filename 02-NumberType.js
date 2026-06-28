function checkNumberType(number) {

    if (number > 0) {
        return "Positive Number";
    } else if (number < 0) {
        return "Negative Number";
    } else {
        return "Zero (Neutral Number)";
    }
}

let num = -10;

console.log("Number :", num);
console.log("Given number is a : ",checkNumberType(num));