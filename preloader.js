// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const path = require('path');
const url = require('url');

//const customTitlebar = require('custom-electron-titlebar');
const customTitlebar = require("custom-electron-titlebar") // Delete this line and uncomment top line

window.addEventListener('DOMContentLoaded', () => {
  new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#2a2a2a'),
    icon: url.format(path.join(__dirname,'/html', '/pics', '/LOGO.png')),
  });

})

window.notify= function notify(msg) {
    return require('node-notifier').notify(msg);
    };