import { configureStore } from '@reduxjs/toolkit';
import contextReducer from './contextSlice';
import currentReducer from './currentSlice';

export const store = configureStore({
	reducer: {
		context: contextReducer,
		current: currentReducer,
	},
});
