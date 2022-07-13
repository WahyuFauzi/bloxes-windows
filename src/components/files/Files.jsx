import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRenderCondition } from '../../redux/contextSlice';
import FrontEndHelper from '../../misc/FrontEndHelper';
import FilesContextMenu from '../contextMenu/filesContextMenu';
import './Files.css';

const helper = new FrontEndHelper();

export default function Header() {
	const files = useSelector((state) => state.current.currentFolder.items);
	const folders = useSelector(
		(state) => state.current.currentFolder.nested_folders
	);

	const dispatch = useDispatch();
	const [xPosition, setXPosition] = useState(0);
	const [yPosition, setYPosition] = useState(0);

	const handleClick = (e, callback) => {
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

	useEffect(() => {
		document.addEventListener('contextmenu', (e) => {
			handleClick(e, () => {
				dispatch(
					setRenderCondition({ renderCondition: true, renderContext: 'main' })
				);
			});
		});
		return () => {
			document.removeEventListener('contextmenu', handleClick);
		};
	});
	return (
		<div
			className="flex"
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			<FilesContextMenu left={xPosition} top={yPosition} />
		</div>
	);
}
