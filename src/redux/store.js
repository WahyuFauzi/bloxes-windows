import { configureStore } from '@reduxjs/toolkit';
import contextReducer from './contextMenuSlice';

export default configureStore({
	reducer: {
		contextReducer: contextReducer,
	},
});

//export const store = configureStore({
//	reducer: {},
//});

//import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from './counterSlice';

//export const store = configureStore({
//	reducer: {
//		counter: counterReducer,
//	},
//});
