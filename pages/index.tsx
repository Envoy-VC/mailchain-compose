import React from 'react';
import Hero from '@/components/layout/hero';
import { Modal, Button } from '@nextui-org/react';
import { Compose } from '@/components/layout/icons';
import { EmailModal } from '@/components/layout/modal';

export default function Home() {
	const [isOpen, setOpen] = React.useState<boolean>(false);
	const handler = (value: boolean) => setOpen(value);

	return (
		<main>
			<div className='mt-[10%]'>
				<Hero />
			</div>
			<EmailModal />
		</main>
	);
}
