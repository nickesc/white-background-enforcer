function setBackgroundColor(item) {

    // only act if Enabled in settings
    if (item.wbgeEnabled != false){
        // Get background color of body
        const bodyStyle = window.getComputedStyle(document.body)
        const currentBgColor = bodyStyle.backgroundColor;

        // Check if background-color is transparent or unset
        if (!currentBgColor || currentBgColor === 'rgba(0, 0, 0, 0)' || currentBgColor === 'transparent') {
            let color = "white";
            if (item.wbgeColor) {
                color = item.wbgeColor;
            }
            document.body.style.backgroundColor = color;
        }
    }

}

function onError(error) {
    console.log(`Error: ${error}`);
}

function wbge() {
    const gettingOptions = browser.storage.sync.get(["wbgeColor", "wbgeEnabled"]);
    gettingOptions.then(setBackgroundColor, onError);
}

wbge()
