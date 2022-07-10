import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showedFile, showedFileItem } from '../../redux/contextSlice';
import Document from '../../images/document';
import Folder from '../../images/folder';
import FilesContextMenu from '../contextMenu/filesContextMenu';
import './Files.css';

// TODO consider modularize the mapping function

export default function Header() {
	const files = useSelector((state) => state.current.currentFolder.items);
	const states = useSelector((state) => state.context.renderConditionFileItem);
	const folders = useSelector(
		(state) => state.current.currentFolder.nestedFolders
	);

	const dispatch = useDispatch();
	const [xPosition, setXPosition] = useState(0);
	const [yPosition, setYPosition] = useState(0);

	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.pageX + 120 > window.innerWidth
			? setXPosition(window.innerWidth - 140)
			: setXPosition(e.pageX);
		e.pageY + 80 > window.innerHeight
			? setYPosition(window.innerHeight - 90)
			: setYPosition(e.pageY - 20);
		dispatch(showedFile(true));
	};

	const handleClickFiles = (e, callback) => {
		e.preventDefault();
		e.stopPropagation();
		e.pageX + 120 > window.innerWidth
			? setXPosition(window.innerWidth - 140)
			: setXPosition(e.pageX);
		e.pageY + 80 > window.innerHeight
			? setYPosition(window.innerHeight - 90)
			: setYPosition(e.pageY - 20);
		callback();
	};
	const fileList = files.map((i, index) => {
		return (
			<div
				className="items w-32 h-32 m-2 cursor-pointer rounded ease-linear duration-100 hover:bg-gray-200"
				key={index}
			>
				<Document className="w-full h-full" color="gray" />
				<p className="w-full text-center">{i.itemName}</p>
			</div>
		);
	});
	const folderList = folders.map((j, index) => {
		return (
			<div
				className="items w-32 h-32 m-2 cursor-pointer rounded ease-linear duration-100 hover:bg-gray-200"
				key={index}
			>
				<Folder className="w-full h-full" color="gray" />
				<p className="w-full text-center">{j}</p>
			</div>
		);
	});

	useEffect(() => {
		const item = document.querySelectorAll('.items').forEach((item) => {
			item.addEventListener('contextmenu', function (e) {
				handleClickFiles(e, () => {
					//dispatch(showedFileItem(true));
					console.log('test');
				});
			});
		});
		const files = document.getElementById('files');
		files.addEventListener('contextmenu', handleClick);
		return () => {
			files.removeEventListener('contextmenu', handleClick);
			//item.removeEventListener('contextmenu', handleClickFiles);
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
			{folderList}
			{fileList}
			<FilesContextMenu left={xPosition} top={yPosition} />
		</div>
	);
}
