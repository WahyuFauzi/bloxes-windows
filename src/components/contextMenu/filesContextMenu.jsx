import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FrontEndHelper from '../../misc/FrontEndHelper';
import { setRenderCondition } from '../../redux/contextSlice';
import { setFolder } from '../../redux/currentSlice';

const helper = new FrontEndHelper();

export default function FilesContextMenu(props) {
	const renderCondition = useSelector((state) => state.context.renderCondition);
	const renderContext = useSelector((state) => state.context.renderContext);
	const folder = useSelector((state) => state.current.currentFolder);
	const dispatch = useDispatch();
	let classes;
	if (renderCondition === false) {
		classes = 'hidden';
	} else if (renderCondition === true) {
		classes = 'text-text-primary bg-dark-primary absolute rounded';
	}

	if (renderContext === 'main') {
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
					dispatch(
						setRenderCondition({ renderCondition: false, renderContext: '' })
					);
				}}
			>
				<div className="text-center rounded cursor-pointer">
					<div className="w-full h-full rounded ">
						<ul>
							<li className="rounded hover:bg-accent-color">upload file</li>
							<li className="rounded hover:bg-accent-color">new folder</li>
						</ul>
					</div>
				</div>
			</div>
		);
	} else {
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
					dispatch(
						setRenderCondition({ renderCondition: false, renderContext: '' })
					);
				}}
			>
				<div className="text-center rounded cursor-pointer">
					<div className="w-full h-full rounded ">
						<ul>
							<li className="rounded hover:bg-accent-color">delete folder</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
