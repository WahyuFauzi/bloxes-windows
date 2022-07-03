/* eslint-disable no-unused-vars */
//this code sucks, make it simpler, modularize
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const port = 3001;

//app.disableHardwareAcceleration();

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
			preload: path.join(__dirname, 'preload.js'), // use a preload script
		},
	});

	win.loadURL('http://localhost:3000');
};

const init = () => {
	createWindow();
	const test = fs.readFileSync(
		path.join(__dirname, '/dummy/dummyDirectory.json'),
		'utf-8'
	);
	console.log(JSON.parse(test));
};

app.on('ready', init);

//TODO Make it shorter
//Upload file
ipcMain.on('upload-file', async (event, folderId) => {
	//get folder in dummyDir by folderId
	let folder = await findFolder(folderId);
	let item = {
		id: '',
		name: '',
	};
	const jsonDir = await fs.readFile(
		path.join(__dirname, '/dummy/dummyDirectory.json'),
		'utf-8'
	);
	let newDirectory;
	var index = jsonDir.indexOf(folderId);
	if (index !== -1) {
		jsonDir.splice(index, 1);
		newDirectory = jsonDir;
	}

	//read file from local
	const uploadedFile = await dialog.showOpenDialog({
		properties: ['openFile'],
	});
	//write file into dummy cloud
	//TODO maybe we could use copyFile?
	fs.readFile(uploadedFile).then((e) =>
		fs.writeFile(path.join(__dirname, '/dummy/dummyStorage'), e)
	);
	//edit json
	if (folder !== false) {
		item.id = Math.floor(Math.random() * 300);
		item.name = path.basename(uploadedFile);
		folder.nested_folders.push(item);
	}
	//write json
	fs.unlink(path.join(__dirname, '/dummy/dummyDirectory.json'));
	fs.writeFile(
		path.join(__dirname, '/dummy/dummyDirectory.json'),
		newDirectory
	);
	//inform renderer
	win.webContents.send('upload-finished', folder);
});

//Download file
ipcMain.on('download-file', async (event, itemId) => {
	//read file from dummyCloud
	const file = await fs.readFile(path.join(__dirname, `/dummy/${itemId}`));
	//download file
	const downloadLocation = await dialog.showOpenDialog({
		properties: ['openFile'],
	});
	fs.writeFile(downloadLocation, file);
});

//Delete file
ipcMain.on('delete-file', async (event, folderId, itemId) => {
	//read json
	const jsonDir = await fs.readFile(
		path.join(__dirname, '/dummy/dummyDirectory.json'),
		'utf-8'
	);
	//delete file
	const deletedFile = await fs.readFile(
		path.join(__dirname, `/dummy/${itemId}`)
	);
	fs.unlink(deletedFile);
	//edit json
	let folder;
	const directory = JSON.parse(jsonDir);
	for (const i in directory) {
		if (directory[i]._id === folderId) {
			folder = directory[i];
			break;
		}
	}
	var itemList = folder.items;
	folder.items = await deleteItemInArray(itemList, itemId);
	let newDirectory = await deleteItemInArray(jsonDir, folderId);
	newDirectory.push(folder);
	//write json
	fs.unlink(jsonDir);
	fs.writeFile(
		path.join(__dirname, '/dummy/dummyDirectory.json'),
		newDirectory
	);
});

//Modify Directory
ipcMain.on('modify-directory', async (event, folderId, folderName) => {
	let newFolder = {
		_id: Math.floor(Math.random() * 300).toString(),
		folder_name: folderName,
		nested_folders: [],
		items: [],
	};
	let folder;
	//read json
	const jsonDir = await fs.readFile(
		path.join(__dirname, '/dummy/dummyDirectory.json'),
		'utf-8'
	);
	//edit json
	const directory = JSON.parse(jsonDir);
	for (const i in directory) {
		if (directory[i]._id === folderId) {
			folder = directory[i];
			break;
		}
	}
	folder.nested_folders.push(newFolder);
	jsonDir.push(newFolder);

	//write json
	fs.unlink(path.join(__dirname, '/dummy/dummyDirectory.json'), 'utf-8');
	fs.writeFile(path.join(__dirname, '/dummy/dummyDirectory.json'), jsonDir);
});

ipcMain.on('open-file', async (event, title) => {
	const file = await dialog.showOpenDialog({ properties: ['openFile'] });
	console.log(file);
});

//TODO modularize the function
//function to find folder based on id
async function findFolder(folderId) {
	let folder;
	const jsonDir = await fs.readFile(
		path.join(__dirname, '/dummy/dummyDirectory.json'),
		'utf-8'
	);
	const directory = JSON.parse(jsonDir);
	for (const i in directory) {
		if (directory[i]._id === folderId) {
			folder = directory[i];
			break;
		}
	}
	return folder;
}

// A function to delete item in array based to a value and then return new array
async function deleteItemInArray(arr, id) {
	let newArray;
	var indexItem = arr.indexOf(id);
	if (indexItem !== -1) {
		arr.splice(indexItem, 1);
		newArray = arr;
	}
	return newArray;
}
