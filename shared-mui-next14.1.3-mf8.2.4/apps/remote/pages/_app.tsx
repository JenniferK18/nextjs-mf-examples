import { AppProps } from 'next/app';
import Head from 'next/head';
import { StyledEngineProvider } from '@mui/material';
import { init } from '@module-federation/runtime'
import React from 'react';

import './globals.css';

const getPlugin = (envVar: string) => {
  return { 
    name: 'runtime-module-plugin', 
    beforeRequest(args: any) {
      // Here you can optimize to replace only the one you want by the args.id
      // It has the exact import you want.
    
      // For this example it runs through all of the remotes in search of a match to replace
      args.options.remotes.forEach((remote: any) => {
        // Matches and replaces with whatever you want
        if (envVar && 'entry' in remote) {
          remote.entry = remote.entry.replace(
            'https://[environment]',
            envVar,
          );
        }
      });
    
      return args;
    }
  }
}

// @ts-ignore
const Remote2 = React.lazy(() => import("remote2/table"))

function CustomApp({ Component, pageProps }: AppProps) {
  init({
    name: 'host',
    remotes: [],
    plugins: [getPlugin(pageProps.envVars)]
  });

  return (
    <StyledEngineProvider injectFirst>
      <Head>
        <title>Welcome to template-remote!</title>
      </Head>
      <main className="app">
        <Remote2 />
        <Component {...pageProps} />
      </main>
    </StyledEngineProvider>
  );
}

export default CustomApp;
