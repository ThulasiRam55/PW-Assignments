let sentence = "I love playwright";

let chars = sentence.split("");
let reversedString = "";

for (let i = chars.length - 1; i >= 0; i--) {
    reversedString += chars[i];
}

console.log(reversedString);