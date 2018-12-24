const express = require ('Express'),
  passport = require ('../utils/passport'),
  jwt = require ('jsonwebtoken'),
  Router = express.Router ()
;

Router.post ('/signup', passport.authenticate ('signup', { session: false }), async (req, res, next) => {
  res.json ({
    status: 'success',
  })
});

Router.post ('/login', passport.authenticate ('login', { session: false }), async (req, res, next) => {
  const params = { id: req.user.id, email: req.user.email },
    token = jwt.sign (params, 'shit_happens', {
      expiresIn: '30 days'
    })
  ;

  return res.json ({ token })
});

module.exports = Router;
