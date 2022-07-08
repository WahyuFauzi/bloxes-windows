import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showedFile } from '../../redux/contextSlice';
//import { showed } from '../../redux/contextMenuSlice';

export default function FilesContextMenu(props) {
	const states = useSelector((state) => state.context.renderConditionFile);
	const dispatch = useDispatch();
	let classes;
	if (states === false) {
		classes = 'text-text-primary bg-dark-primary absolute hidden rounded';
	} else if (states === true) {
		classes = 'text-text-primary bg-dark-primary absolute rounded';
	}
	return (
		<div
			style={{
				width: '120px',
				position: 'absolute',
				top: props.top,
				left: props.left,
			}}
			className={classes}
			onMouseLeave={() => {
				dispatch(showedFile(false));
			}}
		>
			<div className="text-center rounded cursor-pointer">
				<div
					className="w-full h-full rounded hover:bg-accent-color"
					onClick={() => {
						window.api.openFile();
					}}
				>
					<ul>
						<li>upload file</li>
						<li>new folder</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
