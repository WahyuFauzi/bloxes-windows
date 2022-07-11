import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Files from './components/files/Files';
import './App.css';
import FrontEndHelper from './misc/FrontEndHelper';
import { Routes, Route } from 'react-router-dom';

const helper = new FrontEndHelper();

function App() {
	helper.getUserData();
	//window.api.setUser((event, value) => {});

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
