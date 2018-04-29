import NextHead from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

const Head = props => (
  <React.Fragment>
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title || ''}</title>
      <meta name="description" content={props.description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
      <link rel="apple-touch-icon" href="/static/touch-icon.png" />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <link rel="icon" href="/static/favicon.ico" />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || ''} />
      <meta property="og:description" content={props.description || defaultDescription} />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>
    <style jsx global>{`
      body {
        font-size: 16px;
        color: #444444;
        font-family: 'Prompt', sans-serif !important;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      a {
        color: #444444;
      }

      a:hover {
          color: #29AAE3;
      }

      .relative {
          position: relative;
      }

      .in-block {
          display: inline-block;
      }

      .vertical-mid {
          vertical-align: middle;
      }

      .ant-dropdown {
          position: fixed;
      }

      .f-left {
          float: left;
      }

      .f-right {
          float: right;
      }

      .blue {
          color: #29AAE3;
      }

      .hr {
          width: 100%;
          height: 1px;
          background-color: lightgray;
      }
    `}</style>
  </React.Fragment>
);

export default Head;
