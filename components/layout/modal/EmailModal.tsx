import React from 'react';
import { ComposeModal, PreviewModal, SuccessModal, ErrorModal } from '.';
import { ModalState } from '@/types/modal';
import { Modal, Button } from '@nextui-org/react';
import { Compose } from '@/components/layout/icons';

export interface FormProps {
	from: string;
	proposalId: string;
	subject: string;
	body: string;
	attachment?: Buffer;
}

const EmailModal: React.FC = () => {
	const form = React.useRef<FormProps>({
		from: '',
		proposalId: '',
		subject: '',
		body: '',
	});
	const errorMessage = React.useRef<string>('');
	const [modalState, setModalState] = React.useState<ModalState>('compose');
	const emailData = React.useRef<any>();
	const [isOpen, setOpen] = React.useState<boolean>(false);
	const handler = (value: boolean) => setOpen(value);
	const resetForm = () => {
		form.current = {
			from: '',
			proposalId: '',
			subject: '',
			body: '',
		};
	};

	return (
		<div className='mx-auto flex justify-center mt-16 w-fit'>
			<Button
				auto
				color='primary'
				size='xl'
				icon={<Compose fill='currentColor' />}
				onPress={() => handler(true)}
			/>

			<Modal
				closeButton
				preventClose
				aria-labelledby='modal-title'
				open={isOpen}
				onClose={() => {
					handler(false);
					resetForm();
				}}
				width={modalState in ['compose', 'preview'] ? '90%' : '75%'}
			>
				{modalState == 'compose' && (
					<ComposeModal
						state={modalState}
						setState={setModalState}
						form={form.current}
						data={emailData}
						error={errorMessage}
					/>
				)}
				{modalState == 'preview' && (
					<PreviewModal
						state={modalState}
						setState={setModalState}
						data={emailData.current}
						form={form.current}
						error={errorMessage}
					/>
				)}
				{modalState == 'success' && (
					<SuccessModal setOpen={setOpen} />
				)}
				{modalState == 'error' && (
					<ErrorModal
						state={modalState}
						setState={setModalState}
						error={errorMessage.current}
					/>
				)}
			</Modal>
		</div>
	);
};

export default EmailModal;
