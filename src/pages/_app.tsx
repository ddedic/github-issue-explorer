import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from '@/services/apollo/client';
import { Router } from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import type { AppProps } from 'next/app';
import { Loader } from '@/components/loader';
import Colors from '@/config/colors';
import '@/styles/globals.css';

const progress = new ProgressBar({
  size: 2,
  color: Colors.primary[500],
  className: 'bar-of-progress',
  delay: 100,
});

if (typeof window !== 'undefined') {
  progress.start();
  progress.finish();
}

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', () => {
  progress.finish();
  window.scrollTo(0, 0);
});
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    async function init() {
      setClient(await initializeApollo(pageProps.initialApolloState));
      console.log('Apollo client initialized .....');
    }

    init();
  }, [pageProps?.initialApolloState]);

  if (!client) {
    return (
      <div className="h-screen flex flex-col flex-1 items-center justify-center">
        <Loader className="h-12" />
        <span className="text-gray-400 text-sm mt-2">Loading...</span>
      </div>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
