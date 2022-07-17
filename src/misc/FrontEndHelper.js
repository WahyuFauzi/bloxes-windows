//NOTE code what you actually need it

export default class FrontEndHelper {
	async getUserData(callback) {
		window.api.init();
		window.api.setUser((event, value) => callback(value));
	}

	async setFolderInit(callback) {
		window.api.receiveFolder((event, value) => {
			callback(value);
		});
	}

	async uploadItem(folder, callback) {
		window.api.uploadItem(folder);
		window.api.receiveFolder((event, value) => {
			callback(value);
		});
	}

	async downloadItem(itemId) {
		window.downloadItem(itemId);
	}

	async deleteItem(folder, itemId, callback) {
		window.api.deleteItem(folder, itemId);
		window.api.receiveFolder((event, value) => {
			callback(value);
		});
	}

	async setCurrentFolder(folderId, callback) {
		window.api.getFolder(folderId);
		window.api.receiveFolder((event, value) => {
			callback(value);
		});
	}

	async createFolder(folderName, folder, callback) {
		window.api.postFolder(folderName, folder);
		window.api.receiveFolder((event, value) => {
			callback(value);
		});
	}

	async deleteFolder(folderId, folder, callback) {
		window.api.deleteFolder(folderId, folder);
		window.api.receiveFolder((event, value) => {
			callback(value);
		});
	}
}
