import { createSlice } from '@reduxjs/toolkit';

export const currentSlice = createSlice({
	name: 'current',
	initialState: {
		currentPath: [],
		currentFolder: {
			_id: '',
			folder_name: '',
			nested_folders: [],
			items: [],
		},
	},
	reducers: {
		addPath: (state, action) => {
			state.currentPath.push(action.payload);
		},
		backPath: (state, action) => {
			state.currentPath = state.currentPath.pop();
		},
		setFolder: (state, action) => {
			state.currentFolder = action.payload;
			console.log(state.currentFolder);
		},
	},
});

export const { setCurrentPath, setFolder } = currentSlice.actions;

export default currentSlice.reducer;
