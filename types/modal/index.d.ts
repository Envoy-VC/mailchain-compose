import { Receivers } from '@/utils/config';
import { Attachment } from '@mailchain/sdk';

export type ModalState = 'compose' | 'preview' | 'success' | 'error';

export interface FormProps {
	space: string;
	proposalId?: string;
	subject: string;
	body: string;
	attachment?: Attachment;
}

export interface NewProposalEmailProps {
	spaceLogo: string;
	spaceName: string;
	content: string;
	proposalName: string;
	proposalLink: string;
	proposalEnd: number;
}
