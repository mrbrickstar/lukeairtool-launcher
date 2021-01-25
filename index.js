

const {app} = require('electron');
app.commandLine.appendSwitch ("disable-http-cache");
const { BrowserWindow } = require('electron')
const path = require('path');
const express = require("express")
const app1 = express()
var bodyParser = require('body-parser')
const fs = require("fs")
var urlencodedParser = bodyParser.urlencoded({ extended: false })



 

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth:800,
    minHeight: 500,
    frame: false,
    icon: __dirname + './html/pics/LOGO.png',
    webPreferences: {
     preload: path.join(__dirname, 'preloader.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
    }
  })
  win.loadFile('./html/index.html')
  app.commandLine.appendSwitch ("disable-http-cache");
  try{
      JSON.parse(fs.readFileSync('./config.json'))
  }catch(err){
  fs.writeFileSync('./config.json','{"storein":"C:/Program Files (x86)"}')
  }
  win.webContents.openDevTools()
}

app1.use('/static', express.static(__dirname + '/html'));


app.whenReady().then(createWindow)

app1.get("*/seatplans", async function(req, res){
  const fs = require("fs")
  fs.readdirSync("./seatplans/").forEach(file => {
          console.log(file)
      });
  var site = fs.readFileSync("./html/seatplans1.html", "utf8")
  res.send(site)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


app1.listen(90, function(err){
  console.log(err)
})  