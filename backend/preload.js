const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	onInit: () => ipcRenderer.send('on-init'),
	setTitle: (callback) => ipcRenderer.on('set-title', callback),
});
