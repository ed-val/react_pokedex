module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'You don´t have enough credits' });
  }
//  check if the iser has enough credits
  next();
};
