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

User.hasOne(Team, {
  foreignKey: 'team_member_id',
});

Team.belongsTo(User, {
  foreignKey: 'team_member_id',
});

Project.hasOne(Team, {
  foreignKey: 'project_id',
});

Team.belongsTo(Project, {
  foreignKey: 'project_id',
});

module.exports = { User, Task, Team, Project };
