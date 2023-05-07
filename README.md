# 💌 Mailchain Compose

Mailchain Compose is a powerful tool that streamlines communication within DAOs by allowing you to send messages directly to specific roles. Whether you need to send a proposal alert to all followers or an announcement to only moderators, Mailchain Compose makes it easy to select the appropriate roles and deliver your messages directly to them

Mailchain Compose is specifically designed for Snapshot, an off-chain voting platform that features various DAOs such as Stargate DAO, Aave, ENS, and Developer DAO. In Snapshot, DAOs are called spaces, and members who join a DAO are called followers. With Mailchain Compose, you have complete control over who you want to send emails to within your DAO, making it easy to stay connected and up-to-date with your DAO.

---

## Features ✨

- **Role-Based Messaging**: Mailchain Compose allows you to send messages directly to specific roles within your DAO, such as admins, moderators, or members. This way, you can target the most relevant individuals and ensure that your messages are reaching the right people.

- **Complete Control**: With Mailchain Compose, you have complete control over who you want to send emails to within your DAO. You can select specific roles and send messages only to those users.

- **Role Restrictions**: The tool offers role restrictions, allowing you to configure which users can send emails based on their role within the DAO.

- **Built with NextUI, Apollo Client, and thirdweb**: Mailchain Compose is built using NextUI, a UI library created by NextJS, Apollo Client for executing GraphQL queries, and thirdweb as a Web3 framework. This makes it a powerful tool that simplifies messaging in DAOs.

- **Support for Different Wallets**: thirdweb offers support for a variety of different wallets, including EOA wallets, email-based wallets, and account abstracted smart wallets.

- **Markdown Support**: Mailchain Compose also supports GitHub-flavored Markdown, enabling you to embed tables, links, use different text decorations, and embed code in your emails.

- **Email Templates**: Additionally, you can configure email templates using React-Email, a popular email library.

- **Targeting Snapshot Spaces**: This tool targets Snapshot, an off-chain voting platform that features various DAOs such as Stargate DAO, Aave, ENS, and Developer DAO. In Snapshot, DAOs are called spaces, and members who join a DAO are called followers.

---

## Video Demo 🎥

You can find the video demo [here](https://ipfs.io/ipfs/bafybeiaumgayqcxqtkedtcybo273xx3l4n6ocapqbl6udewe5jdc2icbne):

https://ipfs.io/ipfs/bafybeiaumgayqcxqtkedtcybo273xx3l4n6ocapqbl6udewe5jdc2icbne



https://user-images.githubusercontent.com/65389981/236698821-0896ec52-3d40-4849-8155-a8e0af7432fe.mp4



---

## Getting Started 🚀

To get started with Mailchain Compose, follow these simple steps:

1. Clone the GitHub repository using the following command:
   ```bash
   git clone https://github.com/Envoy-VC/mailchain-compose.git
   ```
2. Install the dependencies using npm by running the following command:
   ```bash
   npm install
   ```
   and start a development server
   ```bash
   npm run dev
   ```
3. Set the permission for who can send mails by navigating to the `utils/config.ts` file and changing the `ROLE` variable to your desired role. By default, it is set to any, which means anyone can send mails. There are four options for the `ROLE` variable:
   - `any`: Anyone can send mails
   - `admins`: Only the addresses with `Admin` role can send mails.
   - `members`: Only the addresses with `Member` role can send mails.
   - `moderators`: Only the addresses with `Moderator` role can send mails.
4. Set up your environment variables by creating a new variable called `NEXT_PUBLIC_MAILCHAIN_SECRET_KEY` and setting the value to your Mailchain recovery phrase.
5. If you need to change the Snapshot environment to mainnet, go to the `pages/_app.ts` file and modify the `uri` variable in Apollo Client from `'https://testnet.snapshot.org/graphql'` to `'https://hub.snapshot.org/graphql'`.

That's it! You're ready to start using Mailchain Compose. For testing purposes, here are some example proposal IDs and space names on testnet environment to experiment with:

- Space Name: envoy1084.eth
- Proposal Id: 0x9decb928a696e5d361882d15ac92bfbd40da2f0fdce529c379845d6b2fae2384

<br>

- Space Name: polls.lenster.xyz
- Proposal Id: 0xa5eb90ce9fdbc1aa5723bb03da38476e72c6a7930a90fa50be69afa2f28d3091

Feel free to customize the above instructions as needed to suit your specific needs.
