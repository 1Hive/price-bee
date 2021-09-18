const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')
const dotenv = require('dotenv')

dotenv.config()

const subgraph = process.env.SUBGRAPH_URL
const subgraph_TVL = process.env.TVL_SUBGRAPH

const PRICES_QUERY = gql`
  query {
	tokens(where:{
	  id_in:["${process.env.DAI_ID}","${process.env.TOKEN_ID}","${process.env.WETH_ID}"]
	  }) {
	  id
	  derivedNativeCurrency
	  symbol
	}
  }
`

const TVL_QUERY = gql`
  query {
    reserves(first: 8, orderBy:utilizationRate) {
      price{
        priceInEth
          }
      symbol
      decimals
      totalLiquidity
    }
  }
`

const fetchData = async () => {
    const graphqlClient = new GraphQLWrapper(subgraph)
    const tokensRes = await graphqlClient.performQuery(PRICES_QUERY)

    if (!tokensRes.data) return undefined
    return tokensRes
}

const fetchTVLData = async () => {
    const graphqlClient = new GraphQLWrapper(subgraph_TVL)
    const tvlRes = await graphqlClient.performQuery(TVL_QUERY)

    if (!tvlRes.data) return undefined
    return tvlRes
}

exports.getTokensData = async () => {
    const res = await fetchData()
    return res.data.tokens
}

exports.getTVLData = async () => {
    const res = await fetchTVLData()
    return res.data.reserves
}