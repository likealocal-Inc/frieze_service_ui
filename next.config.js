/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    APISERVER: process.env.APISERVER,
    SERVERIPPORT: process.env.SERVERIPPORT,
  },
};

module.exports = nextConfig;
