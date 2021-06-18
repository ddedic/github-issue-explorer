import { InMemoryCache } from '@apollo/client';
import { persistCache, PersistentStorage } from 'apollo3-cache-persist';
import Config from '@/config/cache';
import { typePolicies } from './typePolicies';

async function initCache(): Promise<InMemoryCache> {
  const cache: InMemoryCache = new InMemoryCache({
    typePolicies,
  });

  if (Config.persist) {
    await persistCache({
      cache,
      storage: window.localStorage as PersistentStorage,
      debug: Config.debug,
    });
  }

  return cache;
}
export default initCache;
