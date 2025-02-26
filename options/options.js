function isJsonString(str) {
    if (str===""){
        return true;
    }
    try {
        JSON.parse(str);
    } catch (e) {
        document.querySelector("#jsonErrorText").innerHTML = e.message;
        return false;
    }
    return true;
}

function errorHint(on){
    if (on){
        document.querySelector("#rules").style.border = "2px solid red";
        document.querySelector("#rules").style.outline = "2px solid #FF333340";
        document.querySelector("#rules").style.outlineOffset = "1px";
        document.querySelector("#rules").style.borderRadius = "3px";
        document.querySelector("#jsonErrorSpan").style.display="unset";
    } else {
        document.querySelector("#rules").style.outline = "revert";
        document.querySelector("#rules").style.border = "revert";
        document.querySelector("#rules").style.outlineOffset = "revert";
        document.querySelector("#rules").style.borderRadius = "revert";
        document.querySelector("#jsonErrorSpan").style.display="none";
    }

}

function unsetOptions(e) {
    e.preventDefault();
    browser.storage.sync.remove("wbgeColor");
    browser.storage.sync.remove("wbgeEnabled");
    console.log("unsetting settings");
    browser.runtime.sendMessage({event: "unset"})
    window.location.reload();
}

function saveOptions(e) {
    e.preventDefault();
    let options = {
        wbgeColor: document.querySelector("#color").value,
        wbgeEnabled: document.querySelector("#enabled").checked,
        wbgeRules: document.querySelector("#rules").value
    }

    if (!isJsonString(options.wbgeRules)){
        errorHint(true);
    } else {
        errorHint(false);
    }

    browser.storage.sync.set(options);
    browser.runtime.sendMessage({event: "save"});
    console.log(options);
}

function restoreOptions() {

    function setOptionChoices(result) {
        document.querySelector("#color").value = result.wbgeColor || "white";
        document.querySelector("#rules").value = result.wbgeRules || "";
        if (!isJsonString(result.wbgeRules)){
            errorHint(true);
        } else {
            errorHint(false);
        }

        if (result.wbgeEnabled == true || result.wbgeEnabled == false) {
            document.querySelector("#enabled").checked = result.wbgeEnabled;
            console.log("loaded enabled choice successfully");
        } else {
            document.querySelector("#enabled").checked = true;
            console.log("failed to load enabled choice");
        }
    }

    function onError(error) {
        console.error(`Error: ${error}`);
    }

    let gettingOptions = browser.storage.sync.get(["wbgeColor","wbgeEnabled","wbgeRules"]);
    gettingOptions.then(setOptionChoices, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", unsetOptions);
