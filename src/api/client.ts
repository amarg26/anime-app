import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const uri =
  import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql'; // replace when your API is ready

export const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache(),
});
