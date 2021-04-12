import { Children } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="manifest.json" />
          <meta name="theme-color" content="#00838f" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="My Travels" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="msapplication-navbutton-color" content="#00838f" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="My Travels" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
          <link href="iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href="iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href="iphoneplus_splash.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
          <link href="iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
          <link href="iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href="iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
          <link href="ipad_splash.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href="ipadpro1_splash.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href="ipadpro3_splash.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          <link href="ipadpro2_splash.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />          <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
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

MyDocument.getInitialProps = async (ctx) => {

  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};