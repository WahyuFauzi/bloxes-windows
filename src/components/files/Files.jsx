import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilesContextMenu from '../contextMenu/filesContextMenu';
import './Files.css';

const dummy = ['item-01', 'folder-02', 'folder-03', 'datatrt'];

export default function Header() {
	const states = useSelector((state) => state.contextReducer);
	const [xPosition, setXPosition] = useState(0);
	const [yPosition, setYPosition] = useState(0);

	const handleClick = (e) => {
		e.preventDefault();
		//console.log(states);
		e.pageX + 120 > window.innerWidth
			? setXPosition(window.innerWidth - 140)
			: setXPosition(e.pageX);
		e.pageY + 80 > window.innerHeight
			? setYPosition(window.innerHeight - 90)
			: setYPosition(e.pageY - 20);
		//dispatch(showed(true));

		//console.log('xPosition');
		//console.log('yPosition');
	};

	const list = dummy.map(function (i) {
		//	const name = i.split('-');
		//	let type;
		//	switch (name[0]) {
		//		case 'item':
		//			type = <Document className="w-full h-full" color="gray" />;
		//			break;
		//		case 'folder':
		//			type = <Folder className="w-full h-full" color="gray" />;
		//			break;
		//		default:
		//			type = <QuestionMark className="w-full h-full" color="gray" />;
		//	}
		//	return (
		//		<div
		//			className="w-32 h-32 m-2 cursor-pointer rounded ease-linear duration-100 hover:bg-gray-200"
		//			key={i}
		//		>
		//			{type}
		//			{name}
		//		</div>
		//	);
	});

	useEffect(() => {
		const files = document.getElementById('files');
		files.addEventListener('contextmenu', handleClick);
		return () => {
			files.removeEventListener('contextmenu', handleClick);
		};
	});

	return (
		<div
			id="files"
			className="files"
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			this is file
			<FilesContextMenu left={xPosition} top={yPosition} />
			{/*<div className="bg-dark-primary">pantek</div>*/}
		</div>
	);
}
