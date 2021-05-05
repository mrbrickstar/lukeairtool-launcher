

const {app} = require('electron');
const electron = require('electron')
const { BrowserWindow } = require('electron')
const path = require('path');
const fs = require("fs");
const { dir } = require('console');




 

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth:800,
    minHeight: 500,
    frame: false,
    backgroundColor: '#2a2a2a',
    icon: __dirname + './html/pics/LOGO.png',
    webPreferences: {
     preload: path.join(__dirname, 'preloader.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  app.commandLine.appendSwitch ("disable-http-cache");

  require('dns').resolve('www.google.com', function(err) {
    if (err) {
      return win.loadFile('./html/nointernet.html')
    }
  });

  win.webContents.session.clearCache(async function(){
    //some callback.
    });

  try{

            JSON.parse(fs.readFileSync('./config.json'))
            win.loadFile('./html/index.html')
            var store = fs.readFileSync("./config.json", "utf8");
            store = JSON.parse(store)
            store = store.storein
            win.loadFile('./html/index.html')
    }catch(err){
      const fetch = require("node-fetch")
      let settings = { method: "Get" };

          async function doit(){
                let url = "http://lukeairtool.net/LAT/version.json";
                var launcher_version = "0";

                await fetch(url, settings)
                .then(res => res.json())
                  .then((json) => {
                      launcher_version = json.launcher
                      console.log(launcher_version)
                  });

              var dirname = path.normalize(path.join(__dirname, '..'));
              dirname = path.normalize(path.join(dirname, '..'))+"/AirTool";
              dirname = JSON.stringify(dirname)
              
              fs.writeFileSync('./config.json','{"storein":'+dirname+',"admin":false, "local_launcher_version":'+launcher_version+'}')
              win.loadFile('./html/settings.html')
                }
      doit();
  }
  
  const nativeTheme = electron.nativeTheme;
  nativeTheme.themeSource = "system"

  setInterval(()=>{
    if(nativeTheme.shouldUseDarkColors != true){
      win.setIcon(path.join(__dirname, '/html/pics/lightmode.png'));
    }else{
      win.setIcon(path.join(__dirname, '/html/pics/LOGO.png'));
    }
  },1000)
}


app.whenReady().then(createWindow)




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
