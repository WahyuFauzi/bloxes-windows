const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	getUserData: () => ipcRenderer.invoke('get-user-data'),

	uploadItem: (folder) => ipcRenderer.invoke('upload-item', folder),

	downloadItem: (itemId) => ipcRenderer.invoke('download-item', itemId),

	deleteItem: (folder, itemId) =>
		ipcRenderer.invoke('delete-item', folder, itemId),

	postFolder: (folderName, folder) =>
		ipcRenderer.invoke('post-folder', folderName, folder),

	deleteFolder: (folderId, folder) =>
		ipcRenderer.invoke('delete-folder', folderId, folder),
});
