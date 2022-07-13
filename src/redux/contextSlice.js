import { createSlice } from '@reduxjs/toolkit';

export const contextSlice = createSlice({
	name: 'context',
	initialState: {
		renderCondition: false,
		renderContext: '',
	},
	reducers: {
		setRenderCondition: (state, action) => {
			state.renderCondition = action.payload.renderCondition;
			state.renderContext = action.payload.renderContext;
		},
	},
});

export const { setRenderCondition } = contextSlice.actions;

export default contextSlice.reducer;
