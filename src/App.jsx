import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Files from './components/files/Files';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FrontEndHelper from './misc/FrontEndHelper';
import { setUser } from './redux/userSlice';
import { addPath, setFolder } from './redux/currentSlice';
import './App.css';

const helper = new FrontEndHelper();

// TODO change from callback to promise
// TODO change from javascript to typescript

function App() {
	const dispatch = new useDispatch();
	helper.getUserData((e) => dispatch(setUser(e)));
	helper.setFolderInit((e) => {
		dispatch(setFolder(e));
		dispatch(addPath(e._id));
	});

	// Sidebar width is 20% and min-width is 183px, should i implement dependency injection?
	// Main(inside routes) width is 80%
	return (
		<div className="flex-column w-screen h-screen">
			<Header />
			<div className="flex w-full main">
				<Sidebar />
				<Routes>
					<Route path="/" element={<Files />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
