const fetch = require('node-fetch')

const fetchTokens = async () => {
    const tokens = await fetch('https://api.coingecko.com/api/v3/coins/list')
        .then((res) => res.json())
        .catch((err) => {
            return undefined
        })
    return tokens
}

exports.getCoingeckoCircSupply = async (botTokenSymbol) => {
    const tokens = await fetchTokens()
    if (!tokens) return undefined

    const tokenFound = tokens.find(
        (token) => token.symbol === botTokenSymbol.toLowerCase(),
    )
    if (!tokenFound) return undefined

    const tokenId = tokenFound.id
    const tokenData = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenId}`)
        .then((res) => res.json())
        .catch((err) => {
            return undefined
        })
    if (!tokenData) return undefined

    const circSupply = tokenData.market_data.circulating_supply

    // eslint-disable-next-line
    return circSupply
}
