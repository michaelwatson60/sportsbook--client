const { whenDev } = require('@craco/craco');
const path = require('node:path');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: {
      add: [
        ...(process.env.NODE_ENV === 'production' &&
        process.env.REACT_APP_SENTRY_URL
          ? [
              sentryWebpackPlugin({
                org: 'sentry',
                project: process.env.REACT_APP_SENTRY_PROJECT,
                authToken: process.env.SENTRY_AUTH_TOKEN,
              }),
            ]
          : []),
      ],
    },
  },
  babel: {
    plugins: [...whenDev(() => [['babel-plugin-styled-components']], [])],
  },
};
