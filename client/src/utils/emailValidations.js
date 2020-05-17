const email_reg_exp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;;
// regular expression provided by emailregex.com

export default (emails) => {
  const invalidEmails = emails
  .split(',')
  .map(email => email.trim())
  .filter(email => email_reg_exp.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
};
