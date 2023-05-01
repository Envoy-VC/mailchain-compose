import React from 'react';
import Hero from '@/components/layout/hero';
import { Button } from '@nextui-org/react';
import { Compose } from '@/components/layout/icons';
import { ComposeModal } from '@/components/layout/modal';

export default function Home() {
	const [visible, setVisible] = React.useState(false);
	const handler = () => setVisible(true);
	return (
		<main>
			<div className='mt-[10%]'>
				<Hero />
			</div>
			<div className='flex justify-center mt-16'>
				<Button
					auto
					color='primary'
					size='xl'
					icon={<Compose fill='currentColor' filled='true' />}
					onClick={handler}
				/>

				<ComposeModal visible={visible} setVisible={setVisible} />
			</div>
		</main>
	);
}
