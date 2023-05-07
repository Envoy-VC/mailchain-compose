import React from 'react';
import { Modal, Text, Row, Image, Button, Spacer } from '@nextui-org/react';
import { ModalState } from '@/types/modal';
import errorIcon from '@/assets/icons/error.svg';

interface Props {
	state: ModalState;
	setState: React.Dispatch<React.SetStateAction<ModalState>>;
	error: string;
}

const ErrorModal = (props: Props) => {
	return (
		<div>
			<Modal.Header justify='flex-start' autoMargin={false}>
				<Row className='items-center'>
					<Text h4 color='#C8CACE'>
						Error
					</Text>
				</Row>
			</Modal.Header>
			<Modal.Body>
				<Row justify='center'>
					<Image src={errorIcon.src} alt='Error Icon' width={96} />
				</Row>
				<Spacer y={2} />
				<Row justify='center'>
					<Text h4 color='#C8CACE'>
						{props.error}
					</Text>
				</Row>
			</Modal.Body>
			<Modal.Footer className='flex justify-end items-center'>
				<Button
					auto
					color='primary'
					size='lg'
					iconRight={null}
					onPress={() => {
						props.setState('compose');
					}}
				>
					Back
				</Button>
			</Modal.Footer>
		</div>
	);
};

export default ErrorModal;
