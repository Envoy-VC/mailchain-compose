import React from 'react';

interface Props {
	fill?: string;
	filled?: 'true' | 'false';
	size?: string;
	height?: number;
	width?: number;
	label?: string;
}

const Compose = (props: Props) => {
	return (
		<svg
			width={props.size || props.width || 24}
			height={props.size || props.height || 24}
			viewBox='0 0 24 24'
			fill={props.filled ? props.fill : 'none'}
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z'
				stroke={props.fill}
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default Compose;
