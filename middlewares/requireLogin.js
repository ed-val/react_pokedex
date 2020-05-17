module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  // unless the user is actually logged in, dont let the next
  // middleware run
  next();
};
