import { createHttpLink, ApolloLink } from '@apollo/client';

const httpLink: ApolloLink = createHttpLink({
  uri: process.env.GRAPHQL_ENDPOINT,
});

export default httpLink;
