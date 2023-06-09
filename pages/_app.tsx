import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
	ThirdwebProvider,
	metamaskWallet,
	coinbaseWallet,
	walletConnect,
	safeWallet,
	paperWallet,
} from '@thirdweb-dev/react';

const client = new ApolloClient({
	uri: 'https://testnet.snapshot.org/graphql',
	cache: new InMemoryCache(),
	headers: {
		'Access-Control-Allow-Origin': '*',
	},
});

const darkTheme = createTheme({
	type: 'dark',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThirdwebProvider
			supportedWallets={[
				metamaskWallet(),
				coinbaseWallet(),
				walletConnect({
					projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
				}),

				safeWallet(),
				paperWallet({
					clientId: process.env.NEXT_PUBLIC_PAPER_CLIENT_ID || '',
				}),
			]}
			activeChain='ethereum'
		>
			<ApolloProvider client={client}>
				<NextUIProvider theme={darkTheme}>
					<Component {...pageProps} />
				</NextUIProvider>
			</ApolloProvider>
		</ThirdwebProvider>
	);
}
