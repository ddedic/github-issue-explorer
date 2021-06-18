import { useMemo } from 'react';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import merge from 'deepmerge';
import initLinks from './links';
import initCache from './cache';

let apolloClient: ApolloClient<any> | null;
let apolloLinks = initLinks();

async function createApolloClient(): Promise<ApolloClient<any>> {
  const cache: InMemoryCache = await initCache();

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from(apolloLinks),
    cache,
  });
}

export async function initializeApollo(
  initialState: object | null = null
): Promise<ApolloClient<any>> {
  const _apolloClient = apolloClient ?? (await createApolloClient());

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export async function useApollo(initialState: object | null): Promise<ApolloClient<any>> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
