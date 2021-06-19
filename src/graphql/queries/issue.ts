import { gql, useQuery } from '@apollo/client';
import { commentBaseFragment } from '../fragments/comment';
import { issueBaseFragment } from '../fragments/issue';

export const GET_ISSUE_QUERY = gql`
  query getIssue($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        __typename
        ...issueBaseFragment
        bodyHTML
        comments(first: 100) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
          edges {
            node {
              ...commentBaseFragment
            }
          }
        }
      }
    }
  }
  ${commentBaseFragment}
  ${issueBaseFragment}
`;

export const useIssue = (owner: string, name: string, number: number) => {
  const { loading, data, error, refetch } = useQuery(GET_ISSUE_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: { owner, name, number },
  });

  return {
    loading,
    issue: data?.repository?.issue ?? null,
    comments: data?.repository?.issue?.comments?.edges
      ? data?.repository?.issue?.comments?.edges.map((edge: { node: any }) => edge.node)
      : null,
    error,
    onRefetch: refetch,
  };
};
