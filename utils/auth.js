// utils/auth.js
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.status(401).redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  