const axios = require('axios').default;

module.exports = class AxiosHelper {
	url = 'http://localhost:3003';
	async postItem(item) {
		return axios.post(`${this.url}/item`, item).catch((err) => {
			console.error(err);
		});
	}

	async getItem(itemId) {
		return axios.get(`${this.url}/item/${itemId}`).catch((err) => {
			console.error(err);
		});
	}

	async deleteItem(itemId) {
		return axios.delete(`${this.url}/item/${itemId}`).catch((err) => {
			console.error(err);
		});
	}

	async postFolder(folder) {
		return axios.post(`${this.url}/folder`, folder).catch((err) => {
			console.error(err);
		});
	}

	async getFolder(folderId) {
		return axios.get(`${this.url}/folder/${folderId}`).catch((err) => {
			console.error(err);
		});
	}

	async updateFolder(folderId, folder) {
		return axios.put(`${this.url}/folder/${folderId}`, folder).catch((err) => {
			console.error(err);
		});
	}

	async deleteFolder(folderId) {
		return axios.delete(`${this.url}/folder/${folderId}`).catch((err) => {
			console.error(err);
		});
	}
};
