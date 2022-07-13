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

	getFolder() {
		const file = dialog.showOpenDialog({
			properties: ['openDirectory'],
		});
		return file;
	}

	getListFolders(folderId, listFolder, undiscovered, callback) {
		listFolder.push(folderId);
		if (undiscovered.length > 0) {
			this.deleteArrayByValue(undiscovered, folderId);
			axios.getFolder(folderId).then((e) => {
				undiscovered.push(e.data.nested_folders);
				for (const i in e.data.nested_folders) {
					this.getListFolders(
						e.data.nested_folders[i],
						listFolder,
						undiscovered,
						callback
					);
				}
			});
		} else {
			callback(listFolder);
		}
	}

	getListItem(listFolder) {
		let listItemId = [];
		for (const i in listFolder) {
			listItemId.push(listFolder[i].items._id);
		}
		return listItemId;
	}

	downloadItem(itemId, downloadLocation) {
		fs.writeFile(
			downloadLocation,
			path.join(__dirname, `../dummy/dummyCloud/${itemId}`),
			(err) => {
				if (err) throw err;
			}
		);
	}

	uploadItem(itemId, itemPath) {
		fs.writeFile(
			path.join(__dirname, `../dummy/dummyCloud/${itemId}`),
			itemPath,
			(err) => {
				if (err) throw err;
			}
		);
	}

	deleteItem(itemId) {
		fs.unlink(path.join(__dirname, `../dummy/dummyCloud/${itemId}`), (err) => {
			if (err) throw err;
		});
	}

	updateDummyUser(newUserData) {
		fs.writeFileSync(
			path.join(__dirname, '../dummy/dummyUser.json'),
			JSON.stringify(newUserData)
		);
	}

	deleteArrayByValue(arr, value) {
		const indexOfObject = arr.findIndex((object) => {
			return object._id === value;
		});

		arr.splice(indexOfObject, 1);
		return arr;
	}
};
