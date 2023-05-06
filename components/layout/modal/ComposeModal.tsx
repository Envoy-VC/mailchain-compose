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
	Loading,
} from '@nextui-org/react';
import Image from 'next/image';
import { PROPOSAL_DETAILS } from '@/utils/graphql';
import { useQuery } from '@apollo/client/react';
import { Attachment, Preview } from '@/components/layout/icons';
import mailbox from '@/assets/icons/mailbox.svg';
import { ModalState } from '@/types/modal';
import { FormProps } from './EmailModal';

interface Props {
	state: ModalState;
	setState: React.Dispatch<React.SetStateAction<ModalState>>;
	form: FormProps;
	data: any;
	error: React.MutableRefObject<string>;
}

const ComposeModal = (props: Props) => {
	const { refetch } = useQuery(PROPOSAL_DETAILS, {
		variables: { proposalId: props.form.proposalId },
		fetchPolicy: 'network-only',
	});
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			console.log(props.form.proposalId);
			await refetch({ proposalId: props.form.proposalId })
				.then((res) => {
					if (res.data?.proposal !== null) {
						props.data.current = res.data?.proposal;
					} else {
						throw new Error('Proposal not found');
					}
				})
				.catch((error) => {
					throw new Error(error.message);
				});
			props.setState('preview');
		} catch (error: any) {
			props.error.current = error.toString().slice(6) as string;
			props.setState('error');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div>
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
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<Grid.Container direction='column' className='gap-[8px]'>
						<Grid>
							<Input
								aria-label='From'
								labelLeft={<div className='min-w-[84px]'>From</div>}
								placeholder='vitalik.eth@ens.mailchain.com'
								width='100%'
								initialValue={props.form.from ? props.form.from : ''}
								type='text'
								required={true}
								animated={false}
								onChange={(e: React.ChangeEvent<FormElement>) =>
									(props.form.from = e.target.value)
								}
							/>
						</Grid>
						<Grid>
							<Input
								aria-label='Proposal ID'
								labelLeft={<div className='min-w-[84px]'>Proposal ID</div>}
								placeholder='0x5e79db7...e4dd5c9'
								width='100%'
								initialValue={
									props.form.proposalId ? props.form.proposalId : ''
								}
								required={true}
								animated={false}
								onChange={(e: React.ChangeEvent<FormElement>) =>
									(props.form.proposalId = e.target.value)
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
								required={true}
								initialValue={props.form.subject ? props.form.subject : ''}
								underlined
								color='secondary'
								rounded={false}
								onChange={(e: React.ChangeEvent<FormElement>) =>
									(props.form.subject = e.target.value)
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
								required={true}
								initialValue={props.form.body ? props.form.body : ''}
								rows={16}
								size='lg'
								onChange={(e: React.ChangeEvent<FormElement>) =>
									(props.form.body = e.target.value)
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
							icon={<Attachment fill='#9750DD' />}
						/>
						<Button
							disabled={isLoading}
							type='submit'
							auto
							color='primary'
							size='lg'
							icon={isLoading ? null : <Preview fill='#d6d6d6' />}
							iconRight={null}
						>
							{isLoading ? (
								<Loading color='currentColor' size='sm' />
							) : (
								'Preview Email'
							)}
						</Button>
					</Grid.Container>
				</form>
			</Modal.Body>
		</div>
	);
};

export default ComposeModal;
