import { gql, useQuery } from '@apollo/client';
import { issueBaseFragment } from '../fragments/issue';

export enum IssueState {
  OPEN = 'open',
  CLOSED = 'closed',
  ALL = 'all',
}

export const GET_ISSUES_QUERY = gql`
  query getIssues($query: String!, $first: Int!, $after: String) {
    search(first: $first, after: $after, type: ISSUE, query: $query) {
      issueCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          __typename
          ... on Issue {
            ...issueBaseFragment
          }
        }
      }
    }
  }
  ${issueBaseFragment}
`;

export const useIssues = (
  repository: string,
  state?: IssueState,
  keyword?: string | null,
  after?: string | null,
  first: number = 50
) => {
  const stateQuery = state && state !== 'all' ? `state:${state}` : ``;
  const keywordQuery = keyword ? `in:title,body ${keyword}` : ``;
  const query = `repo:${repository} is:issue ${stateQuery} ${keywordQuery}`;

  const { loading, data, error, refetch } = useQuery(GET_ISSUES_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: { first, after, query },
  });

  return {
    loading,
    issues: data?.search?.edges
      ? data?.search?.edges.map((edge: { node: any }) => edge.node)
      : null,
    meta: {
      totalCount: data?.search?.issueCount ?? 0,
      ...data?.search?.pageInfo,
    },
    error: error,
    onRefetch: refetch,
  };
};
