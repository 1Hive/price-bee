const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')
const dotenv = require('dotenv')

dotenv.config()

const subgraph = process.env.SUBGRAPH_URL

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

const fetchData = async () => {
    const graphqlClient = new GraphQLWrapper(subgraph)
    const tokensRes = await graphqlClient.performQuery(PRICES_QUERY)

    if (!tokensRes.data) return undefined
    return tokensRes
}

exports.getTokensData = async () => {
    const res = await fetchData()
    return res.data.tokens
}
