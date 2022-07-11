import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FrontEndHelper from '../../misc/FrontEndHelper';
import { showedFile } from '../../redux/contextSlice';

const helper = new FrontEndHelper();

export default function FilesContextMenu(props) {
	const states = useSelector((state) => state.context.renderConditionFile);
	const dispatch = useDispatch();
	let classes;
	if (states === false) {
		classes = 'hidden';
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
				<div className="w-full h-full rounded hover:bg-accent-color">
					<ul>
						<li
							onClick={() => {
								helper.setNewFolder('folder');
								dispatch(showedFile(false));
							}}
						>
							upload file
						</li>
						<li>new folder</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
