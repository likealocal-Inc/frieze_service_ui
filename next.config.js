/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    APISERVER: process.env.APISERVER,
    SERVERIPPORT: process.env.SERVERIPPORT,
  },
};

module.exports = nextConfig;
