import './globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from '../contexts/AppContext';
import { inter } from '@/utils/fonts/Inter';
import Head from 'next/head';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </main>
  );
}