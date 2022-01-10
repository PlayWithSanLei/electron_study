const fs = require('fs')
const path = require('path')
const {log} = console

// 获取到文件展示的dom
const showContent = document.getElementById('show_file_content')

// 读取文件
function readFile() {
    console.log('reading file...')
    fs.readFile(path.join(__dirname, '/test.txt'), (err, data) => {
        if (err) {
            throw new Error(err, 'reading failed')
        }
        showContent.innerText = data
    })
}

// 需要写入的内容
const content = '今天是上班的第一天，在学electron'

// 写入文件
function writeFile() {
    fs.writeFile(
        path.join(__dirname, '/test.txt'),
        content,
        'utf8',
        (err, data) => {
            if (err) {
                return new Error(err, 'reading failed')
            }
            log('written success')
        }
    )
}
