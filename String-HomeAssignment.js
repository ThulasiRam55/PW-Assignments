//Example 1
function lengthOfLastWord(s) {

    let words = s.split(" ");

    let lastWord = words[words.length - 1];

    return lastWord.length;
}

let str1 = "Hello World";
console.log("The last word is with length: ",lengthOfLastWord(str1));

//Example 2
function lengthOfLastWord(s) {

    let trimmedString = s.trim();

    let words = trimmedString.split(" ");

    let lastWord = words[words.length - 1];

    return lastWord.length;
}

let str2 = " fly me to the moon ";
console.log("The last word is with length: ",lengthOfLastWord(str2));

//Example 3
function isAnagram(str1, str2) {

    let string1 = str1.replace(/\s/g, "").toLowerCase();
    let string2 = str2.replace(/\s/g, "").toLowerCase();

    let sortedString1 = string1.split("").sort().join("");
    let sortedString2 = string2.split("").sort().join("");

    return sortedString1 === sortedString2;
}

console.log("The given word is Anagram: ", isAnagram("listen", "silent"));
console.log("The given word is Anagram: ", isAnagram("hello", "world"));