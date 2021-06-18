import gql from 'graphql-tag';
import { ownerBaseFragment } from '../fragments/owner';

export const repositoryBaseFragment = gql`
  fragment repositoryBaseFragment on Repository {
    id
    name
    nameWithOwner
    description
    openGraphImageUrl
    stargazerCount
    forkCount
    issues(states: OPEN) {
      totalCount
    }
    ...ownerBaseFragment
  }
  ${ownerBaseFragment}
`;
