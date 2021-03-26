import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
  uri: 'https://shielded-atoll-12494.herokuapp.com/graphql',
  credentials: 'include'
})

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});