const router = require('express').Router();

const { Project, Team } = require('../models');

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    if (req.session.user.role === 'manager') {
      try {
        const projectsData = await Project.findAll({});
        const projects = projectsData.map((project) =>
          project.get({ plain: true })
        );

        const teamsData = await Team.findAll({});
        const teams = teamsData.map((team) => team.get({ plain: true }));
        // console.log('test');
        return res.render('managerPg', { projects, teams });
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    return res.render('teamMemberPg');
  }
  return res.redirect('/login');
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
