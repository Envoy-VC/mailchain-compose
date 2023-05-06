import React from 'react';
import { Container, Row, Spacer } from '@nextui-org/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { StyledTitle, StyledGradientTitle } from './styles';

const Hero: React.FC = () => {
	return (
		<Container
			display='flex'
			direction='column'
			gap={0}
			justify='center'
			wrap='wrap'
			alignContent='center'
		>
			<Row
				wrap='wrap'
				justify='center'
				className='max-w-[80%] lg:max-w-[60%] text-center'
			>
				<StyledTitle>Transform Your DAO&lsquo;s&nbsp;</StyledTitle>
				<StyledGradientTitle> Governance&nbsp;</StyledGradientTitle>
				<StyledTitle>Process with Web3 Mail.</StyledTitle>
			</Row>
			<Spacer y={1.5} />
			<Row
				wrap='wrap'
				justify='center'
				className='max-w-[80%] lg:max-w-[60%] text-center'
			>
				<ConnectWallet theme='dark' />
			</Row>
		</Container>
	);
};

export default Hero;
