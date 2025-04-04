import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="icon" href="/favicon-fravega.png" />

          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="Una aplicación para buscar usuarios de GitHub." />
          <meta name="keywords" content="github, usuarios, búsqueda, react, next.js" />
          <meta property="og:title" content="Buscador de Usuarios de GitHub con NextJS" />
          <meta property="og:description" content="Una aplicación para buscar usuarios de GitHub." />
          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;