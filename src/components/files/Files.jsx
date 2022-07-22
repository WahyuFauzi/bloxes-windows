import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRenderCondition } from '../../redux/contextSlice';
import { addPath, backPath, setFolder } from '../../redux/currentSlice';
import Document from '../../images/document';
import Folder from '../../images/folder';
import FrontEndHelper from '../../misc/FrontEndHelper';
import FilesContextMenu from '../contextMenu/filesContextMenu';
import './Files.css';

const helper = new FrontEndHelper();

// TODO change from callback to promise

export default function Header() {
	const currentFolder = useSelector((state) => state.current.currentFolder);
	const files = useSelector((state) => state.current.currentFolder.items);
	const folders = useSelector(
		(state) => state.current.currentFolder.nested_folders
	);
	const path = useSelector((state) => state.current.currentPath);

	console.log(path);
	const dispatch = useDispatch();
	const [xPosition, setXPosition] = useState(0);
	const [yPosition, setYPosition] = useState(0);
	const [selectedItem, setSelectedItem] = useState('');
	const [createFolder, setCreateFolder] = useState({
		classes: 'hidden',
		folder_name: '',
	});

	const handleSetCreateFolderRenderCondition = () => {
		setCreateFolder({
			classes: 'h-28 border rounded bg-dark-primary px-4',
			folder_name: '',
		});
	};

	const handleChange = (event) => {
		setCreateFolder({
			classes: 'h-28 border rounded bg-dark-primary px-4',
			folder_name: event.target.value,
		});
	};

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

	const fileList = files.map((i, index) => {
		return (
			<div
				className="items w-32 h-32 m-2 cursor-pointer rounded ease-linear duration-100 hover:bg-gray-200"
				key={index}
				data-item-type="file"
				data-item-id={i._id}
			>
				<Document className="w-24 h-36" color="gray" />
				<p className="w-full text-center">{i.item_name}</p>
			</div>
		);
	});

	const folderList = folders.map((j, index) => {
		return (
			<div
				className="items w-32 h-32 m-2 cursor-pointer rounded ease-linear duration-100 hover:bg-gray-200"
				key={index}
				data-item-type="folder"
				data-item-id={j._id}
				onDoubleClick={() => {
					path.indexOf(j._id) === -1
						? dispatch(addPath(j._id))
						: console.log('This item already exists');
					helper.setCurrentFolder(j._id, (e) => {
						dispatch(setFolder(e));
					});
				}}
			>
				<Folder className="w-24 h-36" color="gray" />
				<p className="w-full text-center">{j.folder_name}</p>
			</div>
		);
	});

	useEffect(() => {
		const items = document.querySelectorAll('.items');
		const files = document.getElementById('files');

		items.forEach((item) => {
			item.addEventListener(
				'contextmenu',
				(e) => {
					handleClick(e, () => {
						setSelectedItem(item.dataset.itemId);
						dispatch(
							setRenderCondition({
								renderCondition: true,
								renderContext: item.dataset.itemType,
							})
						);
					});
				},
				'once'
			);
		});

		files.addEventListener('contextmenu', (e) => {
			handleClick(
				e,
				() => {
					dispatch(
						setRenderCondition({ renderCondition: true, renderContext: 'main' })
					);
				},
				'once'
			);
		});

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
			<button
				className="w-8 h-8 text-xl"
				onClick={() => {
					if (path.length > 1) {
						const id = path.at(-2);
						helper.setCurrentFolder(id, (e) => {
							dispatch(backPath(currentFolder._id));
							dispatch(setFolder(e));
						});
					}
				}}
			>
				🔙 back
			</button>
			<div
				//style={{ position: 'relative', zIndex: '1' }}
				className="select-none flex flex-wrap"
			>
				{folderList}
				{fileList}
			</div>

			<div
				style={{ position: 'relative', zIndex: '100' }}
				className={createFolder.classes}
			>
				<label className="font-bold w-full text-center" htmlFor="folderName">
					Folder Name
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					placeholder="folder name"
					onChange={handleChange}
					value={createFolder.folder_name}
				></input>
				<button
					className="w-32 bg-accent-color mt-3 mx-4 rounded border"
					onClick={() => {
						helper.createFolder(
							createFolder.folder_name,
							currentFolder,
							(e) => {
								dispatch(setFolder(e));
							}
						);
						setCreateFolder({
							classes: 'hidden',
							folder_name: '',
						});
					}}
				>
					Create Folder
				</button>
				<button
					className="w-32 bg-accent-color mt-3 rounded border"
					onClick={() => {
						setCreateFolder({
							classes: 'hidden',
							folder_name: '',
						});
					}}
				>
					Cancel
				</button>
			</div>
			<FilesContextMenu
				left={xPosition}
				top={yPosition}
				onSetCreateFolderRenderCondition={handleSetCreateFolderRenderCondition}
				selectedItemId={selectedItem}
			/>
		</div>
	);
}
