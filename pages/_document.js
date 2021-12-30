import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { map } from 'lodash';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

import { backgroundDark } from 'components/ContextWrapper/ThemeContextWrapper';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={backgroundDark} />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="My Travels" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="msapplication-navbutton-color" content={backgroundDark} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="manifest" href="manifest.json" />
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
          <link rel="icon" type="image/png" sizes="192x192" href="android-icon-192x192.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="57x57" href="apple-icon-57x57.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="60x60" href="apple-icon-60x60.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="apple-icon-72x72.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="76x76" href="apple-icon-76x76.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="114x114" href="apple-icon-114x114.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="120x120" href="apple-icon-120x120.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="144x144" href="apple-icon-144x144.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="152x152" href="apple-icon-152x152.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="apple-icon-180x180.png" />
          <link href="iphone6_splash.png"
                media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image" />
          <link href="iphone5_splash.png"
                media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image" />
          <link href="iphoneplus_splash.png"
                media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
                rel="apple-touch-startup-image" />
          <link href="iphonex_splash.png"
                media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
                rel="apple-touch-startup-image" />
          <link href="iphonexr_splash.png"
                media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image" />
          <link href="iphonexsmax_splash.png"
                media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
                rel="apple-touch-startup-image" />
          <link href="ipad_splash.png"
                media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image" />
          <link href="ipadpro1_splash.png"
                media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image" />
          <link href="ipadpro3_splash.png"
                media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image" />
          <link href="ipadpro2_splash.png"
                media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="favicon-512x512.png" />
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
