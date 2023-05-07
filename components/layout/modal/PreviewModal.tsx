import React from 'react';
import { Modal, Text, Row, Button, Grid, Loading } from '@nextui-org/react';
import { render } from '@react-email/render';

import { ethers } from 'ethers';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useAddress, useSigner } from '@thirdweb-dev/react';

import { useQuery } from '@apollo/client/react';
import { GET_FOLLOWERS, VALIDATE_USER } from '@/utils/graphql';
import { ROLE } from '@/utils/config';

import NewProposalEmail from '@/components/email';

import { ModalState } from '@/types/modal';
import { FormProps } from './EmailModal';

interface Props {
	state: ModalState;
	setState: React.Dispatch<React.SetStateAction<ModalState>>;
	data: any;
	form: FormProps;
	error: React.MutableRefObject<string>;
}

interface NewProposalEmailProps {
	spaceLogo: string;
	spaceName: string;
	content: string;
	proposalName: string;
	proposalLink: string;
	proposalEnd: number;
}

const PreviewModal = (props: Props) => {
	const address = useAddress();
	const signer = useSigner();
	const sdk = ThirdwebSDK.fromSigner(signer as ethers.Signer);
	const { refetch } = useQuery(GET_FOLLOWERS, {
		variables: { spaceId: props.data?.space?.id, first: 1000, skip: 0 },
		fetchPolicy: 'network-only',
	});

	const [isSending, setIsSending] = React.useState<boolean>(false);
	const validateUser = useQuery(VALIDATE_USER, {
		variables: { space: props.data?.space?.id },
		fetchPolicy: 'network-only',
	});

	const emailData: NewProposalEmailProps = {
		spaceLogo: props.data.space?.avatar,
		spaceName: props.data.space?.name,
		content: props.form?.body,
		proposalName: props.data?.title,
		proposalLink: props.data?.link,
		proposalEnd: props.data.end,
	};
	const message = 'Sign Message to Verify your Role in the Space';

	const html = render(<NewProposalEmail {...emailData} />, {
		pretty: true,
	});

	const validate = async (address: string) => {
		let status = false;
		await validateUser
			.refetch({ space: props.data?.space?.id })
			.then(async (res) => {
				if (address in res.data?.space[ROLE]) status = true;
			});
		return status;
	};

	const sendEmail = async (addressList: string[], from: string) => {
		const response = await fetch('/api/send', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				from: `${from}@ethereum.mailchain.com`,
				to: addressList,
				subject: props.form?.subject,
				contentText: `New Proposal Alert: ${props.data?.title}`,
				contentHtml: html,
				attachment: [props.form.attachment],
			}),
		});
		const data = await response.json();
		return data;
	};

	const handleSend = async () => {
		try {
			setIsSending(true);
			if (!address) throw new Error('Please Connect Wallet');
			const signature = await sdk.wallet.sign(message);
			const recoveredAddress = await ethers.utils.verifyMessage(
				message,
				signature
			);
			let resolvedAddress: string | null;
			if (props.form.from.endsWith('.eth')) {
				resolvedAddress = await ethers
					.getDefaultProvider()
					.resolveName(props.form.from);
			} else {
				resolvedAddress = props.form.from;
			}
			if (recoveredAddress !== address)
				throw new Error('Unable to Verify Wallet');
			if (ROLE !== 'any') {
				const isValid = await validate(recoveredAddress);
				if (!isValid)
					throw new Error('User does not have the desired Role to send Emails');
			}
			const followerCount = props.data?.space?.followersCount;
			if (followerCount > 6000)
				throw new Error(
					'Too many followers, cannot send Email to space with more than 6000 followers.'
				);

			let addressList: string[] = [];
			for (let i = 0; i < followerCount / 1000; i++) {
				await refetch({
					spaceId: props.data?.space?.id,
					first: Math.min(1000, followerCount - i * 1000),
					skip: i * 1000,
				})
					.then(async (res) => {
						if (res.data?.follows) {
							res.data?.follows.map((follow: { follower: string }) => {
								addressList.push(`${follow.follower}@ethereum.mailchain.com`);
							});
						}
					})
					.catch((error) => {
						throw new Error(error.message);
					});
			}
			const data = await sendEmail(addressList, recoveredAddress);
			if (data?.error) throw new Error(data.error);
			props.setState('success');
		} catch (error: any) {
			props.error.current = error.toString().slice(6) as string;
			props.setState('error');
		} finally {
			setIsSending(false);
		}
	};
	return (
		<div>
			<Modal.Header justify='flex-start' autoMargin={false}>
				<Row className='items-center'>
					<Text h4 color='#C8CACE'>
						Preview Email
					</Text>
				</Row>
			</Modal.Header>
			<Modal.Body>
				<div className='w-full flex justify-center bg-white'>
					<NewProposalEmail {...emailData} />
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Grid.Container className='flex justify-between'>
					<Grid>
						<Button
							auto
							color='primary'
							size='lg'
							iconRight={null}
							onClick={() => {
								props.setState('compose');
							}}
						>
							Back
						</Button>
					</Grid>
					<Grid>
						<Button
							auto
							disabled={isSending}
							color='gradient'
							size='lg'
							iconRight={null}
							onPress={() => handleSend()}
						>
							{isSending ? (
								<Loading color='currentColor' size='sm' />
							) : (
								'Send Email'
							)}
						</Button>
					</Grid>
				</Grid.Container>
			</Modal.Footer>
		</div>
	);
};

export default PreviewModal;
