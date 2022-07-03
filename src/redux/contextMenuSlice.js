import { createSlice } from '@reduxjs/toolkit';

export const contextSlice = createSlice({
	name: 'context',
	initialState: {
		renderCondition: false,
	},
	reducers: {
		showed: (state, action) => {
			state.renderCondition = action.payload;
		},
	},
});

export const { showed } = contextSlice.actions;

export default contextSlice.reducer;
