const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    const remoteDir = isServer ? 'ssr' : 'chunks';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: `static/${remoteDir}/remoteEntry.js`,
        extraOptions: {},
        remotes: {
          remote: `remote@https://[environment]/_next/static/${remoteDir}/remoteEntry.js`,
        },
        shared: {
          '@mui/': {},
        },
        // @ts-ignore
        runtimePlugins: [
          require.resolve(path.join(__dirname, './plugins/runtimePlugin')),
        ],
      })
    );

    return config;
  },
};

module.exports = nextConfig;
