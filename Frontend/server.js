const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const i18n = require('./i18n');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3000;

// init i18next with serverside settings
// using i18next-express-middleware
i18n
  .use(Backend)
  // .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'th',
    preload: ['en', 'th'], // preload all langages
    ns: ['common', 'create_course'], // need to preload all the namespaces
    backend: {
      loadPath: `${__dirname}/locales/{{lng}}/{{ns}}.json`,
      addPath: `${__dirname}/locales/{{lng}}/{{ns}}.missing.json`,
    },
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express();
        server.use(bodyParser.urlencoded({ extended: true }));
        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18n));
        // serve locales for client
        server.use('/locales', express.static(`${__dirname}/locales`));

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));

        // use next.js
        // remove trailing slash
        server.use((req, res, next) => {
          if (!dev && req.url.length > 1 && req.url.slice(-1) === '/') {
            req.url = req.url.slice(0, -1);
          }
          next();
        });
        server.get('/profile/:tab', (req, res) => {
          const actualPage = '/profile';
          const queryParams = { tab: req.params.tab };
          app.render(req, res, actualPage, queryParams);
        });

        server.get('/courses/:title', (req, res) => {
          const actualPage = '/course-overview';
          const queryParams = { title: req.params.title };
          app.render(req, res, actualPage, queryParams);
        });

        server.get('/booking/:id', (req, res) => {
          const actualPage = '/booking';
          const queryParams = { id: req.params.id };
          app.render(req, res, actualPage, queryParams);
        });

        server.get('*', (req, res) => handle(req, res));

        server.listen(PORT, (err) => {
          if (err) throw err;
          console.log(`> Ready on http://localhost:${PORT}`);
        });
      });
  });
