function setBackgroundColor(item) {
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

function wbge() {
    const gettingOptions = browser.storage.sync.get(["wbgeColor", "wbgeEnabled"]);
    gettingOptions.then(setBackgroundColor, onError);
}

wbge()
