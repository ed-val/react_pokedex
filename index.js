'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

// mongoose.set('useNewUrlParser', true); //if we make more than one conn.
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }); //mongo connected remotely
const app = express();

// by default express does not parse incoming post request and whatever you may
// send will not be available in the req object. Body parser allows this and
// lets you access the body of the post request using req.body inside the endpoint
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //the time we want our cookie to last,
    // as this is set to milisecs, you neeed to do the math for 30 days so we've got
    // thirty days, with 24 h each, with 60 min each hour, with 60 secs each min and
    // 1000 milisecs each sec
    keys: [keys.cookieKey], // KEY TO ENCRYPT THE COOKIE (made randomly)
  })
);

app.use(passport.initialize());
app.use(passport.session());

//the require returns a fx and then we immediately call that fx with a param 'app'
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// notice how NODE_ENV is not defined by us anywhere. HERUKO as well as node.js
// has it defined for us so we can simply use it like that
if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets like our main.js or main.css file

  // this line underneath says: if a request is made and we DO NOT understand it, i.e.
  // we don have an endpoint for this route then send back whatever file we ask you to
  // on the specified route
  app.use(express.static('client/build'));

  // then express will serve up the index-html file if it doesnt recognize the route
  const path = require('path');

  // if theres no endpoint in any routes file, and there is no file inside /client/build/
  // then ok, all options exhausted, i'll give you the index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);

// localhost:5000
