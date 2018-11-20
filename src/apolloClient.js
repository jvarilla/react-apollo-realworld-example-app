import ApolloClient from 'apollo-boost'
import tokenStorage from './tokenStorage'

process.env.REACT_APP_GRAPHQL_URL = "https://localhost:5000/graphql"
const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || 'https://realworld-graphql.herokuapp.com/graphql' 
//Link to my own graphQL server"http://localhost:5000/graphql" //
const clientState = {
  defaults: {
    feedFilter: {
      __typename: 'FeedFilter',
      type: null,
      tag: null
    }
  },
  resolvers: {
    Mutation: {
      changeFeedFilter: (_, { type, tag = null }, { cache }) => {
        const feedFilter = { __typename: 'FeedFilter', type, tag }
        cache.writeData({ data: { feedFilter } })
        return feedFilter
      }
    }
  }
}

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  request: (operation) => {
    const token = tokenStorage.read()
    let headers = {}
    if (token) {
      headers = { authorization: `Token ${token}` }
    }
    console.log(GRAPHQL_URL)
    operation.setContext({ headers })
  },
  clientState
})

export default client
