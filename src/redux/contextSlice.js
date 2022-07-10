import { createSlice } from '@reduxjs/toolkit';

//this slice is responsible for set the hidden or block of the context menu

export const contextSlice = createSlice({
	name: 'context',
	initialState: {
		renderConditionFile: false,
		renderConditionFileItem: false,
	},
	reducers: {
		showedFile: (state, action) => {
			state.renderConditionFile = action.payload;
		},
		showedFileItem: (state, action) => {
			state.renderConditionFileItem = action.payload;
		},
	},
});

export const { showedFile, showedFileItem } = contextSlice.actions;

export default contextSlice.reducer;
