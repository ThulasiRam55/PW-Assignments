function launchBrowser(browserName) {

    if (browserName.toLowerCase() === "chrome") {
        console.log("Launching Chrome Browser");
    } else if (browserName.toLowerCase() === "edge") {
        console.log("Launching Edge Browser");
    }  else if (browserName.toLowerCase() === "firefox") {
        console.log("Launching Firefox Browser");
    } else if (browserName.toLowerCase() === "safari") {
        console.log("Launching Safari Browser");
    } else {
        console.log("Launching " + browserName + " Browser");
    }
}

function runTests(testType) {

    switch (testType.toLowerCase()) {
        case "smoke":
            console.log("Running Smoke Tests");
            break;

        case "sanity":
            console.log("Running Sanity Tests");
            break;

        case "regression":
            console.log("Running Regression Tests");
            break;

        default:
            console.log("Running Smoke Tests");
    }
}

launchBrowser("chrOME");
runTests("Regression");