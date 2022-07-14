import { createSlice } from '@reduxjs/toolkit';

export const currentSlice = createSlice({
	name: 'current',
	initialState: {
		currentPath: [],
		currentFolder: {
			_id: '',
			folder_name: '',
			nested_folders: [
				{ _id: '01', folder_name: 'cat house 1' },
				{ _id: '02', folder_name: 'cat house 2' },
			],
			items: [
				{ _id: '01', item_name: 'jotaro' },
				{ _id: '02', item_name: 'joseph' },
				{ _id: '03', item_name: 'jonathan' },
			],
		},
	},
	reducers: {
		addPath: (state, action) => {
			state.currentPath.push(action.payload);
		},
		backPath: (state, action) => {
			const index = state.currentPath.indexOf(action.payload);
			if (index !== -1) {
				state.currentPath.splice(index, 1);
			}
		},
		setFolder: (state, action) => {
			state.currentFolder = action.payload;
		},
	},
});

export const { addPath, backPath, setFolder } = currentSlice.actions;

export default currentSlice.reducer;
