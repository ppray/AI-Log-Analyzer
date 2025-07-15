// background.js

// Example: Listen for messages from content script
//chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//  if (message.action === 'contentScriptExecuted') {
//    console.log('Content Script has been executed.');
//  }
//});
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.id, { file: "content.js" });
});


