import React from 'react';

export default function folder(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={props.className}
			viewBox="0 0 20 20"
			fill={props.color}
		>
			<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
		</svg>
	);
}
