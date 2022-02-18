const User = require('./User');
const Task = require('./Task');
const Team = require('./Team');
const Project = require('./Project');

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

Project.hasOne(Team, {
  foreignKey: 'project_id',
});

Team.belongsTo(Project, {
  foreignKey: 'project_id',
});

module.exports = { User, Task, Team, Project };
