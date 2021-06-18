module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['github-explorer.vercel.com', 'avatars.githubusercontent.com', 'images.unsplash.com'],
  },
  env: {
    GRAPHQL_ENDPOINT: process.env.NEXT_GRAPHQL_ENDPOINT,
    GRAPHQL_DEBUG: process.env.NEXT_GRAPHQL_DEBUG,
    GITHUB_TOKEN: process.env.NEXT_GITHUB_TOKEN,
  },
};
