import { gql } from '@apollo/client/core';

export const PROPOSAL_DETAILS = gql`
	query GetProposal($proposalId: String) {
		proposal(id: $proposalId) {
			id
			space {
				id
				name
				about
				avatar
				website
				followersCount
			}
			title
			body
			choices
			start
			end
			link
		}
	}
`;

export const GET_FOLLOWERS = gql`
	query GetFollowers($space: [String], $first: Int, $skip: Int) {
		follows(first: $first, skip: $skip, where: { space_in: $space }) {
			follower
		}
	}
`;

export const VALIDATE_USER = gql`
	query ValidateUser($space: String) {
		space(id: $space) {
			admins
			members
			moderators
		}
	}
`;
