//TODO implement eslint
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const AxiosHelper = require('../backend/AxiosHelper');
const HelperClass = require('../backend/BackEndHelper');

// TODO transfer the logic to nest backend

const helper = new HelperClass();
const axios = new AxiosHelper();
//app.disableHardwareAcceleration(); TODO find what does this code use for

const updateFolder = (folder) => {
	axios.updateFolder(folder._id, folder).then((e) => {
		win.webContents.send('receive-folder', folder);
	});
};

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
			preload: path.join(__dirname, '../backend/preload.js'), // use a preload script
		},
	});

	win.loadURL('http://localhost:3000');
	win.webContents.openDevTools();
};

ipcMain.once('init', async (event) => {
	let userData = JSON.parse(helper.getDummyUser());

	if (userData.init_folder === null) {
		axios.postFolder({ folder_name: 'Dio brando' }).then((e) => {
			userData.init_folder = e.data._id;

			helper.updateDummyUser(userData);
		});
	}

	win.webContents.send('set-user', userData);

	axios.getFolder(userData.init_folder).then((e) => {
		win.webContents.send('receive-folder', e.data);
	});
});

ipcMain.on('upload-item', async (event, folder) => {
	const file = await helper.getLocalFile();
	const filePath = file.filePaths[0];

	const itemName = path.basename(filePath);
	const fileSize = fs.statSync(filePath).size;

	axios
		.postItem({ item_name: itemName, item_total_size: fileSize })
		.then((e) => {
			helper.uploadItem(e.data._id, filePath);
			const newItem = {
				_id: e.data._id,
				item_name: e.data.item_name,
			};

			folder.items.push(newItem);
			updateFolder(folder);
		});
});

ipcMain.on('download-item', (event, item) => {
	const itemId = item._id;
	const downloadLocation = helper.getFolder();
	helper.downloadItem(itemId, downloadLocation);
});

ipcMain.on('delete-item', (event, folder, itemId) => {
	let listItem = [];

	for (const i in folder.items) {
		listItem.push(folder.items[i]);
	}

	const newListItem = helper.deleteArrayByValue(listItem, itemId);

	axios.deleteItem(itemId).then(() => {
		helper.deleteItem(itemId);
	});

	////TODO update folder
	folder.items = newListItem;
	updateFolder(folder);
});

ipcMain.once('post-folder', (event, folderName, folder) => {
	axios.postFolder({ folder_name: folderName }).then((e) => {
		const newFolder = {
			_id: e.data._id,
			folder_name: e.data.folder_name,
		};

		//TODO update folder
		folder.nested_folders.push(newFolder);
		updateFolder(folder);
	});
});

ipcMain.on('get-folder', async (event, folderId) => {
	console.log(folderId);
	let folder;
	await axios.getFolder(folderId).then((e) => {
		folder = e.data;
	});
	win.webContents.send('receive-folder', folder);
});

ipcMain.once('delete-folder', (event, folderId, folder) => {
	let listNestedFolder = folder.nested_folders;
	const newListNestedFolder = helper.deleteArrayByValue(
		listNestedFolder,
		folder
	);

	//TODO create backend to delete folder and nested folders
	//TODO create backend to delete listed items

	folder.nested_folders = newListNestedFolder;
	updateFolder(folder);
});

const init = () => {
	createWindow();
};

app.on('ready', init);

app.on('activate', () => {});
