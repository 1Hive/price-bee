# Price bee

A Discord bot to show token prices.

## Quickstart

<a href="https://heroku.com/deploy?template=https://github.com/hernandoagf/price-bee">
<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

Click here to deploy!

## Developer quick start 👩‍💻

`npm run dev` will launch the bot locally, with hot reloading included.

There are a few other scripts provided:

- `start`: Starts up the bot without hot reloading; used for the Heroku deployment.

### Configuration

First, install the dependencies:
`npm install`
`npm install -D`

For the bot to run, it needs these variables, laid out in the `.env.sample` file:

- `DISCORD_API_TOKEN`: Your discord API token. [See this guide on how to obtain one](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).
- `GUILD_ID`: Your Discord server ID.
- `TOKEN_ID`: Your token ID on Honeyswap.
