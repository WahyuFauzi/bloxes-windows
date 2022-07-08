//TODO this code sucks, make it simpler and change to typescript if applicable
const { uploadItem, downloadItem } = require('./backend/itemHelper');
const { app, BrowserWindow } = require('electron');
const path = require('path');

//require('./backend/ipcMain');
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
	//uploadItem('folder', 'item.pdf');
	//downloadItem('fikri.pdf', 'ctq_7-byb2C1ukf6GJY8h');
	createWindow();
};

app.on('ready', init);
