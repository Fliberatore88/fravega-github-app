import './globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from '../contexts/AppContext';
import { inter } from '@/utils/fonts/Inter';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </main>
  );
}