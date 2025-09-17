/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enable styled-components SWC transform for better SSR and dev experience
    styledComponents: true,
  },
};

export default nextConfig;
