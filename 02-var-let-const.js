// Global variable using var
const browserName = 'Chrome';
function getBrowserName() {
    if (browserName == "Chrome") {
        var browserName = "Firefox";
    }
    console.log("Browser name from var :", browserName);
}
getBrowserName();

// Global variable using let
const browserNameLet = `Chrome`;
function getBrowserNameLet() {
    if (browserNameLet == "Chrome") {
        let browserNameLet = "Firefox";
    }
    console.log("Browser name from let :", browserNameLet);
}
getBrowserNameLet();