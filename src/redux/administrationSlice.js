import { createSlice } from '@reduxjs/toolkit';

export const admSlice = createSlice({
	name: 'administration',
	initialState: {
		userName: null,
		items: null,
		dumpedItems: null,
	},
	reducers: {
		setLoginCondition: (state, action) => {
			state.loginCond = action.payload;
		},
	},
});

export const { showed } = admSlice.actions;

export default admSlice.reducer;
