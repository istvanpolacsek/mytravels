import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { map } from 'lodash';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

import { primaryLight } from 'components/ContextWrapper/ThemeContextWrapper';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={primaryLight} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;

CustomDocument.getInitialProps = async(ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createCache({ key: 'css' });
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const { styles } = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = map(styles, ({ key, ids, css }) => (
    <style data-emotion={`${key} ${ids.join(' ')}`} key={key} dangerouslySetInnerHTML={{ __html: css }} />
  ));

  return {
    ...initialProps,
    styles: [...emotionStyleTags, ...React.Children.toArray(initialProps.styles)],
  };
};
