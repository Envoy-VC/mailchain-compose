import React from 'react';
import { Modal, Text, Row, Button, Spacer, Image } from '@nextui-org/react';
import { ModalState } from '@/types/modal';
import successIcon from '@/assets/icons/success.svg';

interface Props {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessModal = (props: Props) => {
	return (
		<div>
			<Modal.Header justify='flex-start' autoMargin={false}>
				<Row className='items-center'>
					<Text h4 color='#C8CACE'>
						Success Modal
					</Text>
				</Row>
			</Modal.Header>
			<Modal.Body>
				<Row justify='center'>
					<Image src={successIcon.src} alt='Error Icon' width={96} />
				</Row>
				<Spacer y={2} />
				<Row justify='center'>
					<Text h4 color='#C8CACE'>
						Sent
					</Text>
				</Row>
			</Modal.Body>
			<Modal.Footer className='flex justify-end items-center'>
				<Button
					auto
					color='primary'
					size='lg'
					iconRight={null}
					onClick={() => {
						props.setOpen(false);
					}}
				>
					Dome
				</Button>
			</Modal.Footer>
		</div>
	);
};

export default SuccessModal;
