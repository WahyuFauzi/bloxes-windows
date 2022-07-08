const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	sendUploadFile: (folderId) => {
		ipcRenderer.send('upload-file', folderId);
	},
	sendDownloadFile: (folderId, itemId) => {
		ipcRenderer.send('download-file');
	},
	sendDeleteFile: (folderId, itemId) => {
		ipcRenderer.send('delete-file');
	},
	sendDeleteFolder: (folderId) => {
		ipcRenderer.send('delete-folder');
	},
	receiveFolder: () => {},
	test: () => {
		console.log('test');
	},
});
