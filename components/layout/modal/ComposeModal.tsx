import React from 'react';
import {
	Modal,
	Text,
	Row,
	Grid,
	Input,
	Textarea,
	Button,
	Spacer,
	FormElement,
} from '@nextui-org/react';
import Image from 'next/image';

import { Attachment, Preview } from '@/components/layout/icons';
import mailbox from '@/assets/icons/mailbox.svg';

interface Props {
	visible: boolean;
	setVisible: Function;
}

interface FormProps {
	from: string;
	proposalId: string;
	subject: string;
	body: string;
	attachment?: Buffer;
}

const ComposeModal = (props: Props) => {
	const [form, setForm] = React.useState<FormProps>({
		from: '',
		proposalId: '',
		subject: '',
		body: '',
	});

	const closeHandler = () => {
		props.setVisible(false);
	};
	return (
		<Modal
			closeButton
			aria-labelledby='modal-title'
			open={props.visible}
			onClose={closeHandler}
			width='90vw'
		>
			<Modal.Header justify='flex-start' autoMargin={false}>
				<Row className='items-center'>
					<Image
						src={mailbox}
						width={24}
						height={24}
						alt='Mail Icon'
						className='mr-2 mt-1'
					/>
					<Text h4 color='#C8CACE'>
						Compose Email
					</Text>
				</Row>
			</Modal.Header>
			<Modal.Body autoMargin={false} className='justify-start'>
				<Grid.Container direction='column' className='gap-[8px]'>
					<Grid>
						<Input
							aria-label='From'
							labelLeft={<div className='min-w-[84px]'>From</div>}
							placeholder='vitalik.eth@ens.mailchain.com'
							width='100%'
							className=''
							type='text'
							required
							animated={false}
							onChange={(e: React.ChangeEvent<FormElement>) =>
								setForm({ ...form, from: e.target.value })
							}
						/>
					</Grid>
					<Grid>
						<Input
							aria-label='Proposal ID'
							labelLeft={<div className='min-w-[84px]'>Proposal ID</div>}
							placeholder='0x5e79db7...e4dd5c9'
							width='100%'
							required
							animated={false}
							onChange={(e: React.ChangeEvent<FormElement>) =>
								setForm({ ...form, proposalId: e.target.value })
							}
						/>
					</Grid>
				</Grid.Container>

				<Grid.Container direction='column'>
					<Grid>
						<Input
							aria-label='Subject'
							width='100%'
							placeholder='Subject for your proposal'
							size='xl'
							underlined
							color='secondary'
							rounded={false}
							onChange={(e: React.ChangeEvent<FormElement>) =>
								setForm({ ...form, subject: e.target.value })
							}
						/>
					</Grid>
					<Spacer y={1} />
					<Grid>
						<Textarea
							aria-label='Body'
							className='border-2 border-[#393A3C]'
							placeholder='Share your proposal with the DAO members.'
							width='100%'
							rows={16}
							size='lg'
							onChange={(e: React.ChangeEvent<FormElement>) =>
								setForm({ ...form, body: e.target.value })
							}
						/>
					</Grid>
					<Spacer y={1} />
				</Grid.Container>
				<Grid.Container className='flex flex-col md:flex-row justify-between gap-2'>
					<Button
						auto
						bordered
						color='secondary'
						size='md'
						icon={<Attachment fill='#9750DD' filled />}
					/>
					<Button
						auto
						color='primary'
						size='lg'
						icon={<Preview fill='#d6d6d6' filled />}
						iconRight={null}
						onClick={() => console.log(form)}
					>
						Preview Email
					</Button>
				</Grid.Container>
			</Modal.Body>
		</Modal>
	);
};

export default ComposeModal;
