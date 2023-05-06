import type { NextApiRequest, NextApiResponse } from 'next';
import { Mailchain } from '@mailchain/sdk';

const secretRecoveryPhrase: string =
	process.env.NEXT_PUBLIC_MAILCHAIN_SECRET_KEY || '';

type MailProps = {
	from: string;
	to: string[];
	subject: string;
	contentText: string;
	contentHtml: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		try {
			const props: MailProps = req.body;
			const mailchain =
				Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);
			if (!props) res.status(400).json({ error: 'Invalid Arguments' });

			// Send Mail
			const { data, error } = await mailchain.sendMail({
				from: props.from,
				to: props.to,
				subject: props.subject,
				content: {
					text: props.contentText,
					html: props.contentHtml,
				},
			});

			if (error) {
				res.status(500).json({ error: error });
			} else res.status(200).json({ data: data });
		} catch (error) {
			res.status(404).json({ error: error });
		}
	} else if (req.method === 'UPDATE') {
		const props: MailProps = req.body;
		if (!props) res.status(400).json({ error: 'Invalid Arguments' });
		res.status(404).json({ data: props });
	}
}
