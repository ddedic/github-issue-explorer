import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('GitHub Auth token is not set!');
  }

  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : null),
    },
  };
});

export default authLink;
