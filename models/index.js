const User = require('./User');
const Task = require('./Task');
const Team = require('./Team');
const Project = require('./Project');
const TeamProject = require('./TeamProject');

User.hasMany(Task, {
  foreignKey: 'user_id',
});

Task.belongsTo(User, {
  foreignKey: 'user_id',
});

Team.hasMany(User, {
  foreignKey: 'team_id',
});

User.belongsTo(Team, {
  foreignKey: 'team_id',
});

Project.belongsToMany(Team, {
  through: {
    model: TeamProject,
    unique: true,
  },
});

Team.belongsTo(Project, {
  through: {
    model: TeamProject,
    unique: true,
  },
});

module.exports = { User, Task, Team, Project, TeamProject };
