'use strict';

const sendgrid = require('sendgrid');

const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super(); //made available methods from extended classes

    this.sgApi = sendgrid(keys.sendGridKey); // this makes the conn.
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //this method comes from helper.Mail class
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    // weird but we're essentially getting the email prop out of the obj we get
    // from each iteration and that string we send it directly to a method defined
    // by sendgrid's classes, so now we have a list of those instances instead of
    // a list of plain objs
    return recipients.map(({ email }) => new helper.Email(email));
  }

  addClickTracking() {
    // ignore this as much as posible. Its what the docs says you to write in order
    // to make a moddified URL and have it sent back to you from sendgrid
    // so you know which user clicked wether yes or no
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    // stup** ass logic but then again, its all needed by sendgrid, we take the list
    // of instances we made with this.formatAddresses and for each recipient we send it
    // to yet another damn extended class called Personalization and use its addTo
    // method to do god knows what... yesus.
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const req = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    // sweet baby jesus, I mean... sending a request body?! what in heaven's name...
    // at least we're done. The whole point of all this was to convert our mailer
    // into a json as in line 57. Which is btw a method we get thanks to sendgrid
    try {
      const res = await this.sgApi.API(req);
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

module.exports = Mailer;
