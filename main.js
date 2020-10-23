
const {app,BrowserWindow} = require("electron")
function createWindow () {
    // Cree la fenetre du navigateur.
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      center:true,
      icon:"leblanc.ico",
      webPreferences: {
        nodeIntegration: true
      }
    })
    win.webContents.openDevTools()
    // et charger le fichier index.html de l'application.
    win.loadFile('index.html')
  }

app.whenReady().then(()=>{
    createWindow()
  })
  app.on('window-all-closed', ()=> {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
