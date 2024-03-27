import { AppProps } from 'next/app';
import Head from 'next/head';
import { StyledEngineProvider } from '@mui/material';
import { init } from '@module-federation/runtime'
import './globals.css';

const getPlugin = (envVars: Record<string, string>) => {
  return { 
    name: 'runtime-module-plugin', 
    beforeRequest(args: any) {
      // Here you can optimize to replace only the one you want by the args.id
      // It has the exact import you want.
    
      // For this example it runs through all of the remotes in search of a match to replace
      args.options.remotes.forEach((remote: any) => {
        // Matches and replaces with whatever you want
        if (envVars.NEXT_PUBLIC_REMOTE_URL && 'entry' in remote) {
          remote.entry = remote.entry.replace(
            'https://[environment]',
            envVars.NEXT_PUBLIC_REMOTE_URL,
          );
        }
      });
    
      return args;
    }
  }
}

function CustomApp({ Component, pageProps }: AppProps) {
  init({
    name: 'host',
    remotes: [],
    plugins: [getPlugin(pageProps.envVars)]
  });

  return (
    <StyledEngineProvider injectFirst>
      <Head>
        <title>Welcome to template-host!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </StyledEngineProvider>
  );
}

export default CustomApp;
