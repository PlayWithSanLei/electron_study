const {ipcRenderer} = require('electron')

console.log(ipcRenderer)
ipcRenderer.on('mainMsg', (event, task) => {
    console.log(task)
    document.getElementById('receive').innerText = task
})

function sendMain() {
    ipcRenderer.send('task', '退出程序')
    console.log('sent')
}
