module.exports = (req, res, next) => {
  if (req.session.uname) {
    if (req.baseUrl == "/admin" && req.session.level >= 2) {
      next();
      return;
    } else {
      if (req.baseUrl == "/index" && req.session.level == 1) {
        next();
        return;
      }
    }
  }
  res.redirect("/login");
};
