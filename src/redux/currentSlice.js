import { createSlice } from '@reduxjs/toolkit';

export const currentSlice = createSlice({
	name: 'current',
	initialState: {
		currentPath: [],
		currentFolder: {
			_id: 'A-01',
			folderName: 'init folder',
			nestedFolders: ['folder1', 'folder2'],
			items: [
				{ _id: '01', itemName: 'Jotaro' },
				{ _id: '02', itemName: 'Jonathan' },
				{ _id: '03', itemName: 'Joseph' },
			],
		},
	},
	reducers: {
		setCurrentPath: (state, action) => {
			state.currentPath = action.payload;
		},
		setFolder: (state, action) => {
			state.currentFolder = action.payload;
		},
	},
});

export const { setCurrentPath, setFolder } = currentSlice.actions;

export default currentSlice.reducer;
