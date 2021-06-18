import { makeVar } from '@apollo/client';
import { RepositoryModel } from '../models/activeRepository';

export const initialRepository = makeVar<RepositoryModel>({
  __typename: 'ActiveRepository',
  id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
  owner: 'facebook',
  name: 'react',
});
