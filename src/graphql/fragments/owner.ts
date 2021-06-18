import gql from 'graphql-tag';

export const userBaseFragment = gql`
  fragment userBaseFragment on User {
    __typename
    id
    login
    avatarUrl
  }
`;

export const organizationBaseFragment = gql`
  fragment organizationBaseFragment on Organization {
    __typename
    id
    login
    avatarUrl
  }
`;

export const ownerBaseFragment = gql`
  fragment ownerBaseFragment on Repository {
    owner {
      ... on Organization {
        ...organizationBaseFragment
      }
      ... on User {
        ...userBaseFragment
      }
    }
  }
  ${organizationBaseFragment}
  ${userBaseFragment}
`;
