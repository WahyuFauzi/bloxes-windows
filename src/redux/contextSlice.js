import { createSlice } from '@reduxjs/toolkit';

//this slice is responsible for set the hidden or block of the context menu

export const contextSlice = createSlice({
	name: 'context',
	initialState: {
		renderConditionFile: false,
		renderConditionFileItem: false,
		renderConditionTrash: false,
		renderConditionTrashItem: false,
	},
	reducers: {
		showedFile: (state, action) => {
			state.renderConditionFile = action.payload;
		},
		showedFileItem: (state, action) => {
			state.renderConditionFileItem = action.payload;
		},
		showedTrash: (state, action) => {
			state.renderConditionTrash = action.payload;
		},
		showedTrashItem: (state, action) => {
			state.renderConditionTrashItem = action.payload;
		},
	},
});

export const { showedFile, showedFileItem, showedTrash, showedTrashItem } =
	contextSlice.actions;

export default contextSlice.reducer;
