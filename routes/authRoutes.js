'use strict';

const passport = require('passport');

module.exports = app => {
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] //these are what u want to get from the usr
    })
  );

  // ok so, the callback from auth/google gets a code (visible on chrome searchbar)
  // and given an URL as the following is gona pass it to its callback so now
  // aut/google/callback will login an user instead of asking for perms again
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    // the logoutfx comes from passport and when executed kills the specidied cookie
    req.logout();
    res.redirect('/');
  });
};
