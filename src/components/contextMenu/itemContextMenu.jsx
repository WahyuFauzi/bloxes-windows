import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showedFileItem } from '../../redux/contextSlice';

export default function ItemsContextMenu(props) {
	const states = useSelector((state) => state.context.renderConditionFileItem);
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
				dispatch(showedFileItem(false));
			}}
		>
			<div className="text-center rounded cursor-pointer">
				<div
					className="w-full h-full rounded hover:bg-accent-color"
					onClick={() => {
						//window.api.openFile();
					}}
				>
					<ul>
						<li>Delete file</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
