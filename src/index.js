const { Client } = require('discord.js')
const dotenv = require('dotenv')

dotenv.config()

const client = new Client()

// eslint-disable-next-line
client.on('ready', () => console.log(`Bot successfully started as ${client.user.tag} 🐝`))

client.login(process.env.DISCORD_API_TOKEN)
