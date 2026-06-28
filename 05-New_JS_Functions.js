//Task 1
function userProfile(name) {
    console.log("Hello, " + name + "!");
}

userProfile("Ram");

//Task 2
const double = (number) => {
    return number * 2;
};

console.log("Double Value:", double(10));

//Task 3
setTimeout(function () {
    console.log("This message is delayed by 2 seconds");
}, 2000);

//Task 4
function getUserData(callback) {

    setTimeout(function () {
        callback();
    }, 3000);
}

getUserData(function () {
    console.log("Call Back Function");
});