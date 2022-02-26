const router = require('express').Router();

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    if (req.session.user.role === 'manager') {
      return res.render('managerPg');
    } else if (req.session.user.role === 'employee') {
      return res.render('teamMemberPg');
    }
  } else {
    return res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  return res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  return res.render('signup');
});

module.exports = router;
