import { configureStore } from '@reduxjs/toolkit';
import contextReducer from './contextSlice';
import currentReducer from './currentSlice';
import userReducer from './userSlice';

export const store = configureStore({
	reducer: {
		context: contextReducer,
		current: currentReducer,
		user: userReducer,
	},
});
