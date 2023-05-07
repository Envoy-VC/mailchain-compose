import React from 'react';
import { Modal, Button } from '@nextui-org/react';
import { useAddress } from '@thirdweb-dev/react';

import { Compose } from '@/components/layout/icons';
import {
	ComposeModal,
	ProposalModal,
	SuccessModal,
	ErrorModal,
	MarkdownModal,
} from '.';

import { FormProps, ModalState } from '@/types/modal';
import { Receivers } from '@/utils/config';
import { Recipients } from '../../../utils/config';

const EmailModal = () => {
	const address = useAddress();
	const form = React.useRef<FormProps>({
		space: '',
		proposalId: '',
		subject: '',
		body: '',
	});
	const errorMessage = React.useRef<string>('');
	const [modalState, setModalState] = React.useState<ModalState>('compose');
	const emailData = React.useRef<any>();
	const receivers = React.useRef<Receivers>('followers');
	const [isOpen, setOpen] = React.useState<boolean>(false);
	const handler = (value: boolean) => setOpen(value);
	const resetForm = () => {
		form.current = {
			space: '',
			proposalId: '',
			subject: '',
			body: '',
		};
	};
	return (
		<div>
			{address && (
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
								recipients={receivers}
								error={errorMessage}
							/>
						)}
						{modalState === 'preview' && receivers.current === 'followers' && (
							<ProposalModal
								state={modalState}
								setState={setModalState}
								data={emailData.current}
								form={form.current}
								error={errorMessage}
							/>
						)}

						{modalState === 'preview' && receivers.current !== 'followers' && (
							<MarkdownModal
								state={modalState}
								setState={setModalState}
								form={form.current}
								error={errorMessage}
								recipients={receivers.current}
							/>
						)}
						{modalState == 'success' && (
							<SuccessModal setState={setModalState} setOpen={setOpen} />
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
			)}
		</div>
	);
};

export default EmailModal;
