import gql from 'graphql-tag';

export const issueBaseFragment = gql`
  fragment issueBaseFragment on Issue {
    id
    number
    title
    state
    createdAt
    author {
      login
      avatarUrl
    }
    labels(first: 3) {
      edges {
        node {
          id
          color
          name
        }
      }
    }
    totalComments: comments {
      count: totalCount
    }
  }
`;
