const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DailyReport = sequelize.define("DailyReport", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  date: {
    type: DataTypes.DATE,
    allowNull: false
  },

  work_description: {
    type: DataTypes.TEXT
  },

  weather: {
    type: DataTypes.STRING
  },

  worker_count: {
    type: DataTypes.INTEGER
  }

}, {
  tableName: "daily_reports",
  timestamps: false
});

module.exports = DailyReport;