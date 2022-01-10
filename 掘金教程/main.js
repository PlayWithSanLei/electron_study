const {app, BrowserWindow, Tray, Menu, nativeImage, ipcMain} = require('electron')
const path = require('path')
let mainWindow, tray

// 监听electron加载完毕的时候创建窗口等等

function createWindow () {
    mainWindow = new BrowserWindow({
        // fullscreen: true,  // 全屏
        // frame: false,  // 让桌面应用没有边框，这样菜单栏也会消失
        resizable: false,  // 不允许用户改变窗口大小
        width: 800,
        height: 600,
        // icon: iconPath,
        minWidth: 300,
        minHeight: 500,
        maxWidth: 800,
        maxHeight: 600,

        // 进行对首选项的设置
        webPreferences: {
            backgroundThrottling: false,  // 设置应用在后台正常运行
            nodeIntegration: true,  // 设置能在页面使用nodejs的API
            contextIsolation: false,  // 关闭警告信息
            // preload: path.join(__dirname, './preload.js')
        }
    })

    mainWindow.loadFile('./main.html')
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    app.on('ready', function () {
        require('@electron/remote/main').initialize()
        require('@electron/remote/main').enable(mainWindow.webContents)
    })
    return mainWindow
}
function createTray() {
    const icon = nativeImage.createFromPath(
        path.join(__dirname, '/static/arita.jfif')
    )

    tray = new Tray(icon)
    tray.setToolTip('electron demo is running')
    tray.setTitle('electron demo')

    tray.on('right-click', () => {
        const template = [
            {label: '无操作'},
            {
                label: '退出',
                click: () => app.quit()
            }
        ]
        const menuConfig = Menu.buildFromTemplate(template)
        tray.popUpContextMenu(menuConfig)
    })

    tray.on('click', () => {
        // 控制窗口的显示
        createWindow()
    })
}

// 引入自定义菜单
// require('./menu')


app.whenReady().then(() => {
    const win = createWindow()
    createTray()
    setTimeout(() => {
        win.webContents.send('mainMsg', 'I am main process message')
    }, 3000)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('task', (event, info) => {
    console.log(event)
    console.log(info)
    if (info === '退出程序') {
        app.quit()
    }
})

