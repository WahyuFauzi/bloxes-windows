const {
	getDummyDirectory,
	findFolder,
	getLocalFile,
	updateDummyDirectory,
	deleteItemInArray,
	getFolder,
} = require('./helper');
const { nanoid } = require('nanoid');
const path = require('path');
const fs = require('fs');

exports.uploadItem = async function uploadItem(folderId, itemName) {
	const newItem = {
		id: nanoid(),
		itemName: itemName,
	};
	const directory = getDummyDirectory();
	const folder = findFolder(folderId, directory);
	const file = await getLocalFile();
	if (file.canceled === true) return;
	const data = await fs.readFile(file.filePaths[0], function (err, data) {
		if (err) throw err;
		console.log(data);
	});
	fs.writeFile(
		path.join(__dirname, `../dummy/dummyCloud/${newItem.id}`),
		data,
		(err) => {
			if (err) throw err;
			else {
				let newDirectory = deleteItemInArray(directory, folder);
				folder.items.push(newItem);
				newDirectory.push(folder);
				updateDummyDirectory(newDirectory);
			}
		}
	);
};

exports.downloadItem = async function downloadItem(itemName, itemId) {
	const data = fs.readFileSync(
		path.join(__dirname, `../dummy/dummyCloud/${itemId}`)
	);
	const downloadLocation = await getFolder();
	console.log(downloadLocation);
	console.log(data);
	fs.writeFileSync(
		path.normalize(`${downloadLocation.filePaths}\\${itemName}`),
		data
	);
};

exports.deleteItem = function deleteItem(folderId, itemId) {
	console.log('download');
};

exports.deleteFolder = function deleteFolder(folderId) {};
