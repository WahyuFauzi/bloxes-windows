//TODO this code sucks, make it simpler and change to typescript if applicable
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

require('./backend/ipcMain');
//app.disableHardwareAcceleration(); TODO find what does this code use for

let win;

const createWindow = () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		minWidth: 960,
		minHeight: 720,
		webPreferences: {
			nodeIntegration: false, // is default value after Electron v5
			contextIsolation: true, // protect against prototype pollution
			enableRemoteModule: false, // turn off remote
			preload: path.join(__dirname, '/backend/preload.js'), // use a preload script
		},
	});

	win.loadURL('http://localhost:3000');
};

const init = () => {
	createWindow();
};
app.on('ready', init);

app.on('activate', () => {});
