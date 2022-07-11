const { dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const AxiosHelper = require('./AxiosHelper');

const axios = new AxiosHelper();

module.exports = class BackEndHelper {
	getDummyUser() {
		return fs.readFileSync(
			path.join(__dirname, '../dummy/dummyUser.json'),
			'utf-8'
		);
	}

	// function to open dialog and get file location
	getLocalFile() {
		const file = dialog.showOpenDialog({
			properties: ['openFile'],
		});
		return file;
	}

	getFileSize(filePath) {
		const fileSize = fs.statSync(filePath).size;
		return fileSize;
	}

	getFolder() {
		const file = dialog.showOpenDialog({
			properties: ['openDirectory'],
		});
		return file;
	}

	copyItemToLocation(itemId, downloadLocation) {
		fs.writeFile(
			downloadLocation,
			path.join(__dirname, `../dummy/dummyCloud/${itemId}`),
			(err) => {
				if (err) throw err;
			}
		);
	}

	deleteItem(itemId) {
		fs.unlink(`../dummy/dummyCloud/${itemId}`, (err) => {
			if (err) throw err;
		});
	}

	getListNestedFolder(listFolderId, folder) {
		listFolderId.push(folder._id);
		for (const i in folder.nested_folders) {
			axios.getFolder(folder.nested_folders[i]).then((response) => {
				this.getListNestedFolder(listFolderId, response.data);
			});
		}
	}

	deleteArrayByValue(arr, value) {
		const index = arr.indexOf(value);
		if (index !== -1) {
			arr.splice(index, 1);
			return arr;
		}
	}

	getListItem(listItem, listFolderId) {
		for (const i in listFolderId) {
			axios.getFolder(listFolderId[i]).then((response) => {
				const listItemResponse = response.data.items;
				for (const j in listItemResponse) {
					listItem.push(listItemResponse[j]);
				}
			});
		}
	}

	updateDummyUser(newUserData) {
		fs.writeFileSync(
			path.join(__dirname, '../dummy/dummyUser.json'),
			JSON.stringify(newUserData)
		);
	}
};
