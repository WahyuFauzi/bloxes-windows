import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { showed } from '../../redux/contextMenuSlice';

export default function FilesContextMenu(props) {
	const states = useSelector((state) => state.contextReducer.renderCondition);
	//const dispatch = useDispatch();
	//FilesContextMenu.propTypes = {
	//	top: PropTypes.number,
	//	left: PropTypes.number,
	//};
	var classes = 'text-text-primary bg-dark-primary absolute rounded';
	//if (states === false) {
	//	classes = 'w-24 h-24 text-white bg-black absolute hidden rounded';
	//} else if (states === true) {
	//	classes = 'w-24 h-24 text-white bg-black absolute rounded';
	//}

	//const fileInput = document.getElementById('upload-btn');
	//const anchor = document.getElementById('download-file');
	//var getFilePath = () => {
	//	console.log(fileInput.files[0]);
	//};
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
				//dispatch(showed(false));
			}}
		>
			<div className="text-center rounded cursor-pointer">
				{/*<label className="w-full cursor-pointer" htmlFor="upload-btn">
					Upload
				</label>
				<input
					className="w-full hidden"
					type="file"
					id="upload-btn"
					onInput={getFilePath}
				/>*/}
				{/*<a className="hidden" id="download-file"></a>*/}
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
