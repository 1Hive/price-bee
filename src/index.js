const { Client } = require('discord.js')
const dotenv = require('dotenv')
const { getTokensData, getTVLData } = require('./fetchData')
const { getCoingeckoCircSupply } = require('./fetchCirculatingSupply')

const { numberWithCommas } = require('./utils')

dotenv.config()

const client = new Client()

// eslint-disable-next-line
client.on('ready', () =>
    console.log(`Bot successfully started as ${client.user.tag} 🐝`),
)

// Updates token price on bot's nickname every X amount of time

let step = 0

function timeout() {
    client.setTimeout(async () => {
        let totalTVL = 0
        if (process.env.TVL_SUBGRAPH) {
            await getTVLData().then((tvlData) =>
                tvlData.map((res) => {
                    reserveTVL =
                        (parseInt(res.price.priceInEth) / 10 ** 8) *
                        (parseInt(res.totalLiquidity) / 10 ** res.decimals)
                    totalTVL = totalTVL + reserveTVL
                }),
            )
        }
        const tokensData = await getTokensData()
        if (tokensData) {
            const tokenData = tokensData.filter(
                (token) => token.id === process.env.TOKEN_ID,
            )[0]
            const symbol = tokenData.symbol
            const circSupply = await getCoingeckoCircSupply(symbol)
            const daiData = process.env.DAI_ID
                ? tokensData.filter((token) => token.id === process.env.DAI_ID)[0]
                : {}
            const ethData = process.env.WETH_ID
                ? tokensData.filter((token) => token.id === process.env.WETH_ID)[0]
                : {}

            const tokenPrice = tokenData?.derivedNativeCurrency
            const daiPrice = daiData?.derivedNativeCurrency
            const ethPrice = ethData?.derivedNativeCurrency

            if (step % 2 === 0 && tokenPrice && daiPrice) {
                console.log(
                    `${symbol}: $${numberWithCommas(
                        parseFloat(tokenPrice / daiPrice).toFixed(2),
                    )}`,
                )
                client.guilds.cache.forEach(async (guild) => {
                    const botMember = guild.me
                    await botMember.setNickname(
                        `${symbol}: $${numberWithCommas(
                            parseFloat(tokenPrice / daiPrice).toFixed(2),
                        )}`,
                    )
                })
            } else if (tokenPrice && ethPrice) {
                let decimals = 3
                if (tokenPrice < 10) {
                    decimals = 6
                }
                console.log(
                    `${symbol}: Ξ${parseFloat(tokenPrice / ethPrice).toFixed(
                        decimals,
                    )}`,
                )
                client.guilds.cache.forEach(async (guild) => {
                    const botMember = guild.me
                    await botMember.setNickname(
                        `${symbol}: Ξ${parseFloat(tokenPrice / ethPrice).toFixed(
                            decimals,
                        )}`,
                    )
                })
            }
            if ((step % 2 === 0) & circSupply && tokenPrice && daiPrice) {
                client.user.setActivity(
                    `MC: $${numberWithCommas(
                        parseFloat((tokenPrice / daiPrice) * circSupply).toFixed(0),
                    )}`,
                    { type: 'WATCHING' },
                )
            } else if (totalTVL > 0) {
                client.user.setActivity(
                    `TVL: $${numberWithCommas(parseFloat(totalTVL).toFixed(0))}`,
                    { type: 'WATCHING' },
                )
            }
        }
        step++
        timeout()
    }, 15 * 1000)
}
client.login(process.env.DISCORD_API_TOKEN)
timeout()
