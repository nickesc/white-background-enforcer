function onError(error) {
    console.error(`Error: ${error}`);
}

// Functions to execute the wbge script on a tab index or the active tab
function onExecuted(result) {
    console.log(`Executed`);
}
function executeWbge(tabId) {
    const executing = browser.tabs.executeScript(tabId, {file: "/src/wbge.js"});
    executing.then(onExecuted, onError);
}
function executeWbgeOnActive(activeInfo) {
    let tabId = activeInfo.tabId;
    executeWbge(tabId);
}

const filter = {
    properties: ["url"],
};

browser.tabs.onUpdated.addListener(executeWbgeOnActive, filter);
browser.tabs.onActivated.addListener(executeWbgeOnActive);
browser.runtime.onMessage.addListener(executeWbgeOnActive);
