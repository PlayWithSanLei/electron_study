"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const path_1 = require("path");
function createWindow() {
    const window = new electron_1.BrowserWindow({
        height: 1000,
        width: 1000,
        webPreferences: {
            webSecurity: false,
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    if (electron_is_dev_1.default) {
        try {
            require('electron-reloader')(module, {});
        }
        catch (_) { }
        window.webContents.openDevTools();
        window.loadURL('http://localhost:8080');
    }
    else {
        window.loadFile((0, path_1.resolve)(__dirname, '../render/dist-render/index.html'));
    }
    return window;
}
electron_1.app.on('ready', () => {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    createWindow();
});
