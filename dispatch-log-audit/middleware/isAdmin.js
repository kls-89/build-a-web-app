module.exports = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  } else {
    console.log('not admin');
    res.redirect('back');
  }
}