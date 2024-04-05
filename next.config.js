const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const CompressionPlugin = require('compression-webpack-plugin');
const { version } = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_ENV: process.env.NODE_ENV,
    API_DEVELOPMENT: process.env.API_DEVELOPMENT,
    WEB_VERSION: version,
  },
  compiler: {
    emotion: true,
  },
  compress: true,
  webpack(config) {
    const plugins = [...config.plugins, new CompressionPlugin()];
    return { ...config, plugins };
  },
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: process.env.SENTRY_WEBPACK_PLUGIN_ENABLE !== 'true',
    disableClientWebpackPlugin: process.env.SENTRY_WEBPACK_PLUGIN_ENABLE !== 'true',
  },
  output: 'export',
};

const sentryWebpackPluginOptions = {
  silent: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

module.exports = () => {
  const plugins = [[withSentryConfig, sentryWebpackPluginOptions], [withBundleAnalyzer]];
  return plugins.reduce((acc, cur) => cur[0](acc, cur[1] ?? undefined), nextConfig);
};
