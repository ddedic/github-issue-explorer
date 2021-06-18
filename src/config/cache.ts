export interface CacheConfig {
  persist: boolean;
  debug: boolean;
}

const cacheConfig: CacheConfig = {
  persist: true,
  debug: false,
};

export default cacheConfig;
