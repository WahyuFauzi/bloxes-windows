const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	openFile: () => {
		ipcRenderer.send('open-file');
		//console.log(dialog.showOpenDialog({ properties: ['openFile'] }));
	},
});
