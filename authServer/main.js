const {
  app,
  BrowserWindow,
  Menu
} = require('electron')

let mainWindow

function createWindow() {
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    width: 60,
    height: 100,
    transparent: false,
    webPreferences: {
      devTools: false
    },
    resizable: false
  })

  mainWindow.loadFile('index.html')


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})