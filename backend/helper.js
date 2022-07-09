const { dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { default: next } = require('next');

//TODO exports as module

// function to open dialog and get file location
exports.getLocalFile = function getLocalFile() {
	const file = dialog.showOpenDialog({
		properties: ['openFile'],
	});
	return file;
};

exports.getFolder = function getFolder() {
	const file = dialog.showOpenDialog({
		properties: ['openDirectory'],
	});
	return file;
};
