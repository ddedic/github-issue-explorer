import { gql, useQuery } from '@apollo/client';
import { repositoryBaseFragment } from '../fragments/repository';

export const GET_REPOSITORY_QUERY = gql`
  query getRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      ...repositoryBaseFragment
    }
  }
  ${repositoryBaseFragment}
`;

export const useRepository = (owner: string, name: string) => {
  const { loading, data, error, refetch } = useQuery(GET_REPOSITORY_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: { owner, name },
  });

  return {
    loading,
    repository: data?.repository ? data.repository : null,
    error,
    onRefetch: refetch,
  };
};
