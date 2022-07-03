import './RecylceBin.css';
export default function RecycleBin() {
	return (
		<div
			className="recycle-bin"
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			this is recycleBin
		</div>
	);
}
