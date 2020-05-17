const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// SINGLE param in model method means get me this model, not create it
const User = mongoose.model('users');

//this encodes a user model and makeit a token that is later on
// stuffed into a cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// just the reverse, we take a cookie and transform it into a usr model
passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

// passport.use is a generic authenticator
passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true //this is so the Gstrategy doesnt set the callback url to http (we need it to https)
      // we're basically saying to google, hey google: heroku proxy its fine, u can
      // trust it, dont switch us to http
    },
    async (accessToken, refreshToken, profile, done) => {
      //first check if profile.id doesnt already exists, else create
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
         return done(null, existingUser);
      }
      const user = await new User({ googleID: profile.id }).save();
      done(null, user);
    }
  )
);
