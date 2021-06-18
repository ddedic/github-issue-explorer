import { TypePolicies as ITypePolicy } from '@apollo/client';
import { initialRepository } from '../state';

export const typePolicies: ITypePolicy = {
  Query: {
    fields: {
      activeRepository: {
        read(existing) {
          if (!existing) {
            return initialRepository();
          }
          return existing;
        },
        merge(existing, incoming) {
          return { ...existing, ...incoming };
        },
      },
    },
  },
};
