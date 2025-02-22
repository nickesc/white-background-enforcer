function setBackgroundColor(item) {
    let rules;
    if (item.wbgeRules) {
        rules = JSON.parse(item.wbgeRules);
    }
    let tld = getTabTld();

    // check against custom rules and override settings if needed
    if (rules) {
        if (rules[tld]){
            let rule = rules[tld];
            if (item.wbgeEnabled == false) rule.wbgeEnabled = false;
            item = rule;
        }
    }

    console.log(item)

    // Get body style and bg color
    const bodyStyle = window.getComputedStyle(document.body)
    const currentBgColor = bodyStyle.backgroundColor;

    // only act if Enabled in settings
    if (item.wbgeEnabled == false){
        if (bodyStyle.getPropertyValue("--wbge-status")==="enabled") {
            document.body.style.backgroundColor = "unset";
            document.body.style.setProperty("--wbge-status", "disabled");
            console.log("WBGE Disabled")
        }
        return;
    }

    // Set default bg color
    let color = "white";
    if (item.wbgeColor) {
        color = item.wbgeColor;
    }

    // Check if background-color is transparent or unset
    if (!currentBgColor || currentBgColor === 'rgba(0, 0, 0, 0)' || currentBgColor === 'transparent') {
        document.body.style.backgroundColor = color;
        document.body.style.setProperty("--wbge-status", "enabled");
        console.log("WBGE Executed")
    }
}

function onError(error) {
    console.error(`Error: ${error}`);
}

// get TLD of the current tab
function getTabTld() {
    let url = new URL(window.location.href)
    let parts = url.hostname.split('.');
    return parts.slice(-2).join('.');
}

function wbge() {
    const gettingOptions = browser.storage.sync.get(["wbgeColor", "wbgeEnabled", "wbgeRules"]);
    gettingOptions.then(setBackgroundColor, onError);
}

wbge()
