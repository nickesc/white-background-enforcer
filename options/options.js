function unsetOptions(e) {
    e.preventDefault();
    browser.storage.sync.remove("wbgeColor");
    browser.storage.sync.remove("wbgeEnabled");
    console.log("unsetting settings");
    window.location.reload();
}

function saveOptions(e) {
    e.preventDefault();
    let options = {
        wbgeColor: document.querySelector("#color").value,
        wbgeEnabled: document.querySelector("#enabled").checked
    }
    browser.storage.sync.set(options);
    console.log(options)
}

function restoreOptions() {

    function setOptionChoices(result) {
        document.querySelector("#color").value = result.wbgeColor || "white";

        if (result.wbgeEnabled == true || result.wbgeEnabled == false) {
            document.querySelector("#enabled").checked = result.wbgeEnabled;
            console.log("loaded enabled choice successfully")
        } else {
            document.querySelector("#enabled").checked = true;
            console.log("failed to load enabled choice")
        }
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let gettingOptions = browser.storage.sync.get(["wbgeColor","wbgeEnabled"]);
    gettingOptions.then(setOptionChoices, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", unsetOptions);
