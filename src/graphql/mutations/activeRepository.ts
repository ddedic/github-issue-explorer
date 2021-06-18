import { initializeApollo } from '@/services/apollo/client';
import { RepositoryModel } from '@/services/apollo/models/activeRepository';
import { GET_ACTIVE_REPOSITORY_QUERY } from '../queries/activeRepository';

export const updateActiveRepository = async (repository: RepositoryModel) => {
  try {
    const client = await initializeApollo();
    const current = client.readQuery({ query: GET_ACTIVE_REPOSITORY_QUERY });

    const updatedActiveRepository = { ...current.activeRepository, ...repository };

    client.writeQuery({
      query: GET_ACTIVE_REPOSITORY_QUERY,
      data: {
        activeRepository: updatedActiveRepository,
      },
    });

    return updatedActiveRepository;
  } catch (error) {
    throw new Error(error.message);
  }
};
