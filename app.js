const express = require ('Express'),
  logger = require ('morgan'),
  bodyParser = require ('body-parser'),
  passport = require ('./utils/passport'),
  app = express ()
;

const environment = process.env.NODE_ENV,
  stage = require ('./config.js')[environment],
  authRouter = require ('./routes/authentication'),
  profileRouter = require ('./routes/profile')
;

app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: true }));
app.use (passport.initialize ());

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use ('/auth', authRouter);
app.use ('/me', passport.authenticate('jwt', { session : false }), profileRouter);

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});


app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;

