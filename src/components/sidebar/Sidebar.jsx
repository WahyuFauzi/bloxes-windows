import { Link } from 'react-router-dom';
import './Sidebar.css';
export default function Sidebar() {
	return (
		<div
			onContextMenu={(e) => e.preventDefault()}
			className="sidebar pt-6 bg-light-primary text-white"
		>
			<div className="w-full h-2/5 text-center">
				<div className="w-full h-3/4 bg-black"></div>
				<p className="mt-4">Name</p>
			</div>
			<div>
				<ul className="text-center">
					<Link to="/">
						<li className="h-8 pt-1 mx-4 mt-2 rounded cursor-pointer hover:bg-accent-color">
							Files
						</li>
					</Link>
					{/*<Link to="recyclebin">
						<li className="h-8 pt-1 mx-4 mt-2 rounded cursor-pointer hover:bg-accent-color">
							Recycle Bin
						</li>
					</Link>*/}
				</ul>
			</div>
		</div>
	);
}
