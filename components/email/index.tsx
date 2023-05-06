import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
	Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface NewProposalEmailProps {
	spaceLogo: string;
	spaceName: string;
	content: string;
	proposalName: string;
	proposalLink: string;
	proposalEnd: number;
}

export const NewProposalEmail = (props: NewProposalEmailProps) => {
	const previewText = `New Proposal: ${props.spaceName}`;
	const endDate = new Date(props.proposalEnd * 1000)
		.toUTCString()
		.toLocaleString();
	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind
				config={{
					theme: {
						extend: {
							fontFamily: {
								segoe:
									'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
							},
						},
					},
				}}
			>
				<Body className='bg-white font-segoe'>
					<Section>
						<Container className='w-[580px] pt-[20px] pb-[48px] pr-0'>
							<Section>
								<Img
									src='https://uploads-ssl.webflow.com/6193af32c4bb83588771612b/63163cdf369f8ad33461205d_mc-logo.svg'
									width='144'
									height='30'
									alt='Mailchain'
									className='mt-8'
								/>
							</Section>
							<Section>
								<Img
									src={`https://ipfs.io/ipfs/${props.spaceLogo.slice(7)}`}
									width='96'
									height='96'
									alt={props.spaceName}
									className='mb-4 mt-8 mx-auto'
								/>
							</Section>
							<Section className='pb-5'>
								<Row>
									<Text className='text-[32px] leading-5 font-bold text-[#484848]'>
										Hi there, {props.spaceName} community!
									</Text>
									<Text className='text-[18px] leading-[1.4] text-[#484848]'>
										Proposal Name: {props.proposalName}
									</Text>
									<Text className='text-[20px] leading-6 font-medium text-[#484848] p-[24px] bg-[#f2f3f3] rounded-[4px]'>
										{props.content}
									</Text>
									<Text className='text-[18px] leading-[1.4] text-[#484848]'>
										Voting is open now and will remain open until {endDate}. To
										vote, simply connect to our DAO using your favorite
										Web3-enabled wallet and review the proposal.
									</Text>
									<Text className='text-[18px] leading-[1.4] text-[#484848] pb-4'>
										If you have any questions or concerns, we&lsquo;re always
										here to help. Reach out to us on our Socials. Thanks for
										your continued support of {props.spaceName}. We can&lsquo;t
										wait to hear your input on this important decision-making
										process!
									</Text>
									<Text className='text-[18px] leading-[1.4] text-[#484848] pb-4'>
										We can&lsquo;t wait to hear your input on this important
										decision-making process!
									</Text>

									<Button
										className='bg-[#ff5254] rounded-[4px] text-white text-[18px] text-center w-[100%] block decoration-none py-4'
										href={props.proposalLink}
									>
										Vote Now
									</Button>
								</Row>
							</Section>

							<Hr className='border-[#cccccc] my-[20px]' />
						</Container>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default NewProposalEmail;
