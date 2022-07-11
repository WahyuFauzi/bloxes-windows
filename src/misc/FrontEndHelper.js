import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { setFolder } from '../redux/currentSlice';

//NOTE code what you actually need it

export default class FrontEndHelper {
	dispatch = useDispatch();
	async getUserData() {
		const user = await window.api.getUserData();
		this.dispatch(setUser(user));
	}

	async setCurrentFolder(folderId) {
		const folder = await window.api.getFolder(folderId);
		this.dispatch(setFolder(folder));
	}

	async createNewFolder(folderId, folderName) {}

	async deleteFolder(folderId, folderName) {}

	async uploadItem(folderId) {
		const folder = await window.api.uploadItem();
		this.dispatch(setFolder(folder));
	}

	async downloadItem(itemId) {}

	async deleteItem(folderId, itemId) {}
}
