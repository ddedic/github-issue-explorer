import { gql, useQuery } from '@apollo/client';

export const GET_CURRENT_USER_QUERY = gql`
  query getCurrentUser {
    viewer {
      id
      login
    }
  }
`;

export const useCurrentUser = () => {
  const { loading, data, error, refetch } = useQuery(GET_CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    loading,
    user: data?.viewer ? data.viewer : null,
    error,
    onRefetch: refetch,
  };
};
