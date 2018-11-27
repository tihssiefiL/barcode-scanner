const {
    app,
    BrowserWindow,
    Menu,
    dialog,
    ipcMain
} = require('electron')
global.sharedObj = {
    srcpath: '',
    tarpath: '',
    sourcefile: '',
    testuser: ''
};

let mainWindow = null
ipcMain.on('mysql', (event, arg) => {
    console.log(' conn mysql fail')
})
ipcMain.on('barcodeSetting', (event, arg) => {
    console.log('barcodeSetting')
})
ipcMain.on('Setting', (event, arg) => {
    console.log('Setting')
})
ipcMain.on('download', (event, arg) => {
    dialog.showSaveDialog()
})

function createWindow() {
    // Menu.setApplicationMenu(null)
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        frame: true,
        transparent: false,
        webPreferences: {
            devTools: true
        },
        // resizable: false
    })

    mainWindow.loadFile('index.html')
    mainWindow.webContents.openDevTools()
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    mainWindow.on('closed', function () {
        mainWindow = null
        child = null
    })

}
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
    }
})

if (shouldQuit) {
    app.quit()
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
/////////////////////////////////////////////
ipcMain.on('alert', (event, arg) => {
    if (!mainWindow.isFocused()) {
        mainWindow.minimize()
        mainWindow.restore()
    } else {
        mainWindow.focus()
    }
    event.sender.send('alert-reply', arg)
})