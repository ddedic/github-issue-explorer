import apolloLogger from 'apollo-link-logger';
import httpLink from './http';
import errorLink from './error';
import authLink from './auth';

const initLinks = () => {
  const tempLinks = [authLink, errorLink, httpLink];

  if (process.env.GRAPHQL_DEBUG) {
    // Logger cannot be last, because httpLink is terminating link
    tempLinks.splice(tempLinks.length - 1, 0, apolloLogger);
  }

  return tempLinks;
};

export default initLinks;
