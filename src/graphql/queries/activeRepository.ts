import { gql, useQuery } from '@apollo/client';

export const GET_ACTIVE_REPOSITORY_QUERY = gql`
  query getActiveRepository {
    activeRepository @client {
      id
      owner
      name
    }
  }
`;

export const useActiveRepository = () => {
  const { loading, data, error, refetch } = useQuery(GET_ACTIVE_REPOSITORY_QUERY);

  return {
    loading,
    activeRepository: data?.activeRepository ? data.activeRepository : null,
    error,
    onRefetch: refetch,
  };
};
