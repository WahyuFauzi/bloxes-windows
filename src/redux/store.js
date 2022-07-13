import { configureStore } from '@reduxjs/toolkit';
import currentReducer from './currentSlice';
import contextReducer from './contextSlice';
import userReducer from './userSlice';

export const store = configureStore({
	reducer: {
		context: contextReducer,
		current: currentReducer,
		user: userReducer,
	},
});
