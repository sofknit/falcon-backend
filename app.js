const express = require ('Express'),
  logger = require ('morgan'),
  bodyParser = require ('body-parser'),
  passport = require ('./utils/passport'),
  app = express ()
;

const environment = process.env.NODE_ENV,
  stage = require ('./config.js')[environment],
  authRouter = require ('./routes/authentication')
;

app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: true }));
app.use (passport.initialize ());

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use ('/auth', authRouter);

app.use('/api/v1', (req, res, next) => {
  res.send('Hello');
  next();
});

app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;

