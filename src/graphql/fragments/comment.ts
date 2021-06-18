import gql from 'graphql-tag';

export const commentBaseFragment = gql`
  fragment commentBaseFragment on IssueComment {
    id
    author {
      login
      avatarUrl
    }
    bodyText
    bodyHTML
    createdAt
  }
`;
