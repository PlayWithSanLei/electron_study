const {Menu, BrowserWindow} = require('electron')

// 创建菜单模板，数组的每个对象都是一个菜单
const template = [
    {
        label: '菜单一',
        submenu: [
            {
                label: '子菜单一',
                click: () => {
                    let sonWin = new BrowserWindow({
                        width: 200,
                        height: 200,
                    })
                    sonWin.loadFile('./index2.html')
                    sonWin.on('close', () => {
                        sonWin = null
                    })
                },
                // 快捷键
                accelerator: 'ctrl+n'
            },
            {
                label: '子菜单二'
            },
            {
                label: '子菜单三'
            },
            {
                label: '子菜单四'
            }
        ]
    },
    {
        label: '菜单二',
        submenu: [
            {
                label: '子菜单一'
            },
            {
                label: '子菜单二'
            },
            {
                label: '子菜单三'
            },
            {
                label: '子菜单四'
            }
        ]
    }
]

// 从模板中创建菜单
const myMenu = Menu.buildFromTemplate(template)

// 设置为应用程序菜单
Menu.setApplicationMenu(myMenu)
