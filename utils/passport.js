const passport = require ('passport'),
  localStrategy = require ('passport-local').Strategy,
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt,
  bcrypt = require ('bcrypt'),
  DB = require ('../models'),
  UserModel = DB['user']
;

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    //Generating the bcrypt hash of the passpord
    //SaltRounds = 10 
    //TODO: shift to secrets.json
    password = await bcrypt.hash(password, 10);

    //Save the information provided by the user to the the database
    const user = await UserModel.create({ email, password });

    //Send the user information to the next middleware
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    //Find the user associated with the email provided by the user
    const user = await UserModel.findOne({ email });
    if( !user ){
      //If the user isn't found in the database, return a message
      return done(null, false, { message : 'User not found'});
    }

    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const validate = await bcrypt.compare(password, user.password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }

    //Send the user information to the next middleware
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

passport.use (new JWTstrategy ({
  secretOrKey: 'shit_happens',
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    return done (null, token.user);
  } catch (error) {
    done (error);
  }
}))

module.exports = passport;
