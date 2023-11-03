/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.genius.com", protocol: 'https' },
      { hostname: "images.rapgenius.com", protocol: 'https' },
      { hostname: "img.clerk.com", protocol: 'https' },
      { hostname: "assets.genius.com", protocol: 'https' },
    ],
  }
};

module.exports = nextConfig;
