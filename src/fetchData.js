const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/1hive/uniswap-v2'
const XDAI_HNY_PAIR = '0x4505b262dc053998c10685dc5f9098af8ae5c8ad'

const PRICE_QUERY = gql`
  query {
    pair(id: "${XDAI_HNY_PAIR}") {
      token1Price
      token0 {
        symbol
      }
    }
  }
`

const fetchData = async () => {
  const graphqlClient = new GraphQLWrapper(SUBGRAPH_URL)
  const result = await graphqlClient.performQuery(PRICE_QUERY)

  if (!result.data) return undefined
  return result
}

module.exports = async function getTokenPrice() {
  const data = await fetchData()
  const price = parseFloat(data.pair.token1Price).toFixed(2)
  return price
}

module.exports = async function getTokenSymbol() {
  const data = await fetchData()
  return data.pair.token0.symbol
}
