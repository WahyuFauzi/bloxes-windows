import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Files from './components/files/Files';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FrontEndHelper from './misc/FrontEndHelper';
import './App.css';
import { setUser } from './redux/userSlice';
import { addPath, setFolder } from './redux/currentSlice';

const helper = new FrontEndHelper();

//TODO improve using async function

function App() {
	const dispatch = new useDispatch();
	helper.getUserData((e) => dispatch(setUser(e)));
	helper.setFolderInit((e) => {
		dispatch(setFolder(e));
		console.log(e._id);
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
