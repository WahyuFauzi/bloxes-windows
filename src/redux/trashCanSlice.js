import { createSlice } from '@reduxjs/toolkit';

export const trashCanSlice = createSlice({
	name: 'trashCan',
	initialState: {
		dumpedItems: [],
	},
	reducers: {
		//showed: (state, action) => {
		//	state.renderCondition = action.payload;
		//},
		setTrashCan: (state, action) => {
			state.dumpedItems = action.payload;
		},
	},
});

export const { setTrashCan } = trashCanSlice.actions;

export default trashCanSlice.reducer;
