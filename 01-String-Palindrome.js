let sentence = "madam";

function reverseTheString(sentence) {
    let chars = sentence.split("");
    let reversedString = "";

    for (let i = chars.length - 1; i >= 0; i--) {
        reversedString += chars[i];
    }
    return reversedString;
}

function isPalindrome(sentence) {
    let reversedString = reverseTheString(sentence);

    if (sentence === reversedString) {
        return true;
    } else {
        return false;
    }
}

console.log("Original String:", sentence);
console.log("Reversed String : ", reverseTheString(sentence));
console.log("Is Palindrome?", isPalindrome(sentence));