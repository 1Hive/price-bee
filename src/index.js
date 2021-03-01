const { Client } = require('discord.js')
const dotenv = require('dotenv')
const { getTokenPrice, getTokenSymbol } = require('./fetchData')

dotenv.config()

const client = new Client()

// eslint-disable-next-line
client.on('ready', () => console.log(`Bot successfully started as ${client.user.tag} 🐝`))

// Updates token price on bot's nickname every X amount of time
client.setInterval(async () => {
  const price = await getTokenPrice()
  const symbol = await getTokenSymbol()

  const botMember = (await client.guilds.fetch(process.env.GUILD_ID)).me

  await botMember.setNickname(`${symbol} price: $${price}`)
  await client.user.setActivity('Market Cap: $999', { type: 'WATCHING' })
}, 1 * 60 * 1000)

client.login(process.env.DISCORD_API_TOKEN)
