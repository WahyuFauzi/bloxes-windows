const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	init: () => ipcRenderer.send('init'),

	uploadItem: (folder) => ipcRenderer.send('upload-item', folder),

	downloadItem: (item) => ipcRenderer.send('download-item', item),

	deleteItem: (folder, item) => ipcRenderer.send('delete-item', folder, item),

	postFolder: (folderName, folder) =>
		ipcRenderer.send('post-folder', folderName, folder),

	getFolder: (folderId) => {
		ipcRenderer.send('get-folder', folderId);
	},

	deleteFolder: (folderId, folder) =>
		ipcRenderer.send('delete-folder', folderId, folder),

	receiveFolder: (callback) => ipcRenderer.once('receive-folder', callback),

	setUser: (callback) => ipcRenderer.once('set-user', callback),
});
