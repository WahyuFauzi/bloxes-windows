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

	async downloadItem(item) {
		window.downloadItem(item);
	}

	async deleteItem(folder, item, callback) {
		window.api.deleteItem(folder, item);
		window.api.receiveFolder((event, value) => {
			callback(value);
		});
	}

	async setCurrentFolder(folder, callback) {
		window.api.getFolder(folder._id);
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
}
