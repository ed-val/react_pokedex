'use strict';

const Keys = require('../config/keys');
const stripe = require('stripe')(Keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// IMPORTANT: any api method (get, post, del. etc.) can get an arbitrary num of
// arguments and all will be called with the three req, res and next props, so
// one can use as many middlewares as necessary just as long as there's one call
// back that handles the res object

// here in the args we say, hey node, here's ONLY the declaration of my middleware
// dont run it just yet (when the server is initializing) but only when ever a
// request has been made. 
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ error: 'You must log in!' });
    }

    stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id, // obtained with Stripe.js
      description: 'Five dollars for 5 credits'
    }, (err, charge) => {
      // asynchronously called
      console.log(err, 'charge: ', charge);
    });

    // passport middleware adds this user property to the req obj
    req.user.credits += 5;
    try {
      const user = await req.user.save();
      if (user) res.send(user);
    } catch (err) {
      console.log(err);
    }
  });
};
