const sequelize = require("../config/db");

const User = require("./user");
const Project = require("./project");
const DailyReport = require("./dailyReport");

Project.hasMany(DailyReport, {
  foreignKey: "project_id"
});

DailyReport.belongsTo(Project, {
  foreignKey: "project_id"
});

module.exports = {
  sequelize,
  User,
  Project,
  DailyReport
};