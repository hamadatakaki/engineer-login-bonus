import type { NextConfig } from 'next';

const isGitHubPages = process.env.DEPLOY_ENV === 'GH_PAGES';

const nextConfig: NextConfig = {
  assetPrefix: isGitHubPages ? '/engineer-login-bonus' : '',
  basePath: isGitHubPages ? '/engineer-login-bonus' : '',
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
