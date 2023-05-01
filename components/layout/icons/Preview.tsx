import React from 'react';

interface Props {
	fill?: string;
	filled?: boolean;
	size?: string;
	height?: number;
	width?: number;
	label?: string;
}

const Preview = (props: Props) => {
	return (
		<svg
			width={props.size || props.width || 24}
			height={props.size || props.height || 24}
			viewBox='0 0 52 52'
			fill={props.filled ? props.fill : 'none'}
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M51.8,25.1C47.1,15.6,37.3,9,26,9S4.9,15.6,0.2,25.1c-0.3,0.6-0.3,1.3,0,1.8C4.9,36.4,14.7,43,26,43
		s21.1-6.6,25.8-16.1C52.1,26.3,52.1,25.7,51.8,25.1z M26,37c-6.1,0-11-4.9-11-11s4.9-11,11-11s11,4.9,11,11S32.1,37,26,37z'
				stroke={props.fill}
			/>
			<path
				d='M26,19c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7S29.9,19,26,19z'
				stroke={props.fill}
			/>
		</svg>
	);
};

export default Preview;
