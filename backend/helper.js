const { dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// function to open dialog and get file location
exports.getLocalFile = function getLocalFile() {
	const file = dialog.showOpenDialog({
		properties: ['openFile'],
	});
	return file;
};

exports.getFolder = function getFolder() {
	const file = dialog.showOpenDialog({
		properties: ['openDirectory'],
	});
	return file;
};

//get dummy directory json
exports.getDummyDirectory = function getDummyDirectory() {
	const directory = fs.readFileSync(
		path.join(__dirname, '../dummy/dummyDirectory.json'),
		'utf-8'
	);
	return JSON.parse(directory);
};

//function to find folder based on id
exports.findFolder = function findFolder(folderId, directory) {
	for (const i in directory) {
		if (directory[i].id === folderId) {
			return directory[i];
		}
	}
};

// A function to delete item in array based to a value and then return new array
exports.deleteItemInArray = function deleteItemInArray(arr, id) {
	var indexItem = arr.indexOf(id);
	if (indexItem !== -1) {
		arr.splice(indexItem, 1);
	}
	return arr;
};

exports.updateDummyDirectory = function updateDummyDirectory(directory) {
	fs.writeFileSync(
		path.join(__dirname, '../dummy/dummyDirectory.json'),
		JSON.stringify(directory)
	);
};
