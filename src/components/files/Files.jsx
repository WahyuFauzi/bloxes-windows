import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showedFile } from '../../redux/contextSlice';
import Document from '../../images/document';
import Folder from '../../images/folder';
import QuestionMark from '../../images/unidentified';
import FilesContextMenu from '../contextMenu/filesContextMenu';
import './Files.css';

const dummy = ['item-01', 'folder-02', 'folder-03', 'datatrt'];

export default function Header() {
	const dispatch = useDispatch();
	const [xPosition, setXPosition] = useState(0);
	const [yPosition, setYPosition] = useState(0);

	const handleClick = (e) => {
		e.preventDefault();
		e.pageX + 120 > window.innerWidth
			? setXPosition(window.innerWidth - 140)
			: setXPosition(e.pageX);
		e.pageY + 80 > window.innerHeight
			? setYPosition(window.innerHeight - 90)
			: setYPosition(e.pageY - 20);
		dispatch(showedFile(true));
	};

	const list = dummy.map(function (i) {
		const name = i.split('-');
		let type;
		switch (name[0]) {
			case 'item':
				type = <Document className="w-full h-full" color="gray" />;
				break;
			case 'folder':
				type = <Folder className="w-full h-full" color="gray" />;
				break;
			default:
				type = <QuestionMark className="w-full h-full" color="gray" />;
		}
		return (
			<div
				className="w-32 h-32 m-2 cursor-pointer rounded ease-linear duration-100 hover:bg-gray-200"
				key={i}
			>
				{type}
				{name}
			</div>
		);
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
			className="files flex"
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			{list}

			{/*<div className="bg-light-primary"></div>
			<div className="bg-light-primary"></div>
			<div className="bg-light-primary"></div>*/}
			<FilesContextMenu left={xPosition} top={yPosition} />
		</div>
	);
}
