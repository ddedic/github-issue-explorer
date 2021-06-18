import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = process.env.GITHUB_TOKEN;
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : null),
    },
  };
});

export default authLink;
