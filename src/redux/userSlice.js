import { createSlice } from '@reduxjs/toolkit';

export const userSlice = new createSlice({
	name: 'user',
	initialState: {
		id: 'A-01',
		email: 'dio.brando@gmail.com',
	},
	reducers: {
		setData: (state, action) => {
			state.id = action.payload.id;
			state.email = action.payload.email;
		},
	},
});

export const { setData } = userSlice.actions;

export default userSlice.reducer;
