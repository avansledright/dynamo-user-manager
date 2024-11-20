// next.config.js
module.exports = {
    pageExtensions: ['tsx', 'ts'],
    webpack: (config) => {
      config.resolve.fallback = { crypto: false };
      return config;
    }
}