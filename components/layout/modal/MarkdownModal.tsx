import React from 'react';
import { Modal, Text, Row, Button, Grid, Loading } from '@nextui-org/react';

import { ethers } from 'ethers';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useAddress, useSigner } from '@thirdweb-dev/react';

import { useQuery } from '@apollo/client/react';
import { VALIDATE_USER } from '@/utils/graphql';
import { ROLE, Receivers } from '@/utils/config';

import ReactMarkdown from 'react-markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';

import { ModalState, FormProps } from '@/types/modal';

interface Props {
	state: ModalState;
	setState: React.Dispatch<React.SetStateAction<ModalState>>;
	form: FormProps;
	recipients: Receivers;
	error: React.MutableRefObject<string>;
}

const MarkdownModal = (props: Props) => {
	const address = useAddress();
	const signer = useSigner();
	const sdk = ThirdwebSDK.fromSigner(signer as ethers.Signer);

	const [isSending, setIsSending] = React.useState<boolean>(false);

	const getUsers = useQuery(VALIDATE_USER, {
		variables: { space: props.form.space },
		fetchPolicy: 'network-only',
	});

	const message = 'Sign Message to Verify your Role in the Space';

	const validateUserRoles = async (address: `0x${string}`) => {
		let status = false;
		await getUsers.refetch({ space: props.form.space }).then(async (res) => {
			if (address in res.data?.space[ROLE]) status = true;
		});
		return status;
	};

	const getAddressList = async (role: Receivers) => {
		let addressList: string[] = [];
		await getUsers.refetch({ space: props.form.space }).then(async (res) => {
			res.data?.space[role].map((user: string) => {
				addressList.push(`${user}@ethereum.mailchain.com`);
			});
		});
		return addressList;
	};

	const sendEmail = async (
		addressList: string[],
		from: string,
		html: string
	) => {
		const response = await fetch('/api/send', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				from: `${from}@ethereum.mailchain.com`,
				to: addressList,
				subject: props.form.subject,
				contentText: props.form.subject,
				contentHtml: html,
				attachment: [props.form.attachment],
			}),
		});
		const data = await response.json();
		return data;
	};

	const handleSendEmail = async () => {
		try {
			setIsSending(true);
			if (!address) throw new Error('Please Connect Wallet');
			const signature = await sdk.wallet.sign(message);
			const recoveredAddress = await ethers.utils.verifyMessage(
				message,
				signature
			);
			if (ROLE !== 'any') {
				const isValid = await validateUserRoles(
					recoveredAddress as `0x${string}`
				);
				if (!isValid)
					throw new Error('User does not have the desired Role to send Emails');
			}
			const addressList = await getAddressList(props.recipients);
			console.log(addressList);
			const file = await unified()
				.use(remarkParse)
				.use(remarkBreaks)
				.use(remarkRehype)
				.use(remarkGfm)
				.use(rehypeSanitize)
				.use(rehypeHighlight)
				.use(rehypeStringify)
				.process(props.form.body);

			const data = await sendEmail(addressList, recoveredAddress, String(file));
			console.log(data);
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
			<Modal.Header justify='flex-start'>
				<Row className='items-center'>
					<Text h4 color='#C8CACE'>
						Preview Email
					</Text>
				</Row>
			</Modal.Header>
			<Modal.Body className='flex justify-start' autoMargin={false}>
				<ReactMarkdown
					remarkPlugins={[remarkGfm, remarkBreaks]}
					rehypePlugins={[rehypeHighlight]}
				>
					{props.form.body}
				</ReactMarkdown>
			</Modal.Body>
			<Modal.Footer>
				<Grid.Container className='flex justify-between'>
					<Grid>
						<Button
							auto
							color='primary'
							size='lg'
							iconRight={null}
							onClick={() => props.setState('compose')}
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
							onPress={async () => {
								await handleSendEmail();
							}}
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

export default MarkdownModal;
