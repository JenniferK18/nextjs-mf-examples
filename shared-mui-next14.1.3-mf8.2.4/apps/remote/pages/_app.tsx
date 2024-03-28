import { AppProps } from 'next/app';
import Head from 'next/head';
import { StyledEngineProvider } from '@mui/material';
import React from 'react';

import './globals.css';

function CustomApp({ Component, pageProps }: AppProps) {

  return (
    <StyledEngineProvider injectFirst>
      <Head>
        <title>Welcome to template-remote!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </StyledEngineProvider>
  );
}

export default CustomApp;
