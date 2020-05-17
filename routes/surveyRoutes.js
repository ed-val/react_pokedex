'use strict';
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url'); //<- comes with node by default
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

// we first want to know if the use is 1 logged in and has enough credits
module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    // if you want to access req.user you NEED to make user that such user is
    // logged in, hence the requireLogin middleware
    const surveys = await Survey.find({ _user: req.user.id }).select({
      // _user is the reference to the Users document, so we search every survey
      // of a given user
      recipients: false
    });
    // .select chained method to select only specific properties in this case
    // we exclude the recipients prop

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting');
  });

  app.post('/api/surveys/webhooks', (req) => {
  //   const r = [
  //     {
  //     ip: '189.160.197.110',
  //     sg_event_id: 'PViI8bQPQGGG9rEiZoSmrQ',
  //     sg_message_id: 'md_RsZ6bR3S_YV6aDMdY2Q.filter0064p3mdw1-6231-5CD75B54-26.0',
  //     useragent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
  //     event: 'click',
  //     url_offset: { index: 0, type: 'html' },
  //     email: 'sunburstmaker@gmail.com',
  //     timestamp: 1557617508,
  //     url: 'http://localhost:3000/api/surveys/thanks'
  //   }
  // ];
    const p = new Path('/api/surveys/:surveyId/:choice');
    // THE WHOLE POINT of these chained methods is just to clean the res that the
    // webhook (this case sendgrid) returns, cause we know in beforehand it will not
    // always return the same information
    _.chain(req.body)
    .map(event => {
      const pathname = new URL(event.url).pathname;
      const match = p.test(pathname); //{ surveyId: '65r545r65e45654', choice: 'yes' }
      if (match) return { email: event.email, ...match };
      return undefined;
    })
    // remove undefineds from array of events
    .compact() //<- this searches for and find only objs
    // if not, it removes them from list
    .uniqBy('email', 'surveyId') //<- this
    // line says: look at the given properties in here, for each obj if their
    // value is repeated remove them from arr
    .each(({ surveyId, email, choice }) => {
      // two args in the updateOne method the first is the search query and
      // the second one updates the document it found
      // updateOne is async but given this is a post method from sendgrid
      // we dont really need to respond anything, ergo no async await needed
      Survey.updateOne(
        // USE A QUERY like this so the search heavy logic its done by mongo
        // so we dont bring a document with tens of thousands of subdocuments
        // to our node world its just unnecessary
        {
          _id: surveyId, // <- always search for mongo created _id
          recipients: {
            $elemMatch: { email, responded: false } // $elem match is a mongo operator
          }
        },
        {
          $inc: { [choice]: 1 }, //%inc: increment by specified amount
          $set: { 'recipients.$.responded': true }, // recipients.$ : from what
          // you found in the subdocument 'recipients', update the responded prop
          // to specified value
          lastResponded: new Date()
        }
      ).exec();
    })
    .value(); //<-this ends the chain event and returns the final value of the arr
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      // notice the strange '( )'? this is used so we tell to the javascript interpreter
      // that we are defining a shorhand object instead of the function's body
      // it will return a list of objs of email: 'some@em.com' and we dont define
      // the 'responded' value because mongoose already default it for us to false
      // .trim() used to remove the space character off the email string
      _user: req.user.id, // <- id generated automatically by mongo
      dateSent: Date.now(),
    });

    // send an email
    // the second arg, its a fx that will simply return the markup and send it to the
    // Mailer class instance for later use inside it
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();

      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
