import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ContextProvider } from '../contexts/ContextProvider';

require('@solana/wallet-adapter-react-ui/styles.css');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ContextProvider>
        <Component {...pageProps} />
        <Analytics />
      </ContextProvider>
    </>
  );
}
