let browser = "Chrome";

function checkBrowserVersion(callback) {
    setTimeout(function () {
        callback(browser);
    }, 2000);
}

function displayBrowserVersion(version) {
    console.log("Browser version using callback:", version);
}

checkBrowserVersion(displayBrowserVersion);