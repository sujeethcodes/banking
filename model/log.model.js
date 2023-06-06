const Sequelize = require("sequelize");
const DB = require("./index");

const log = DB.define(
  "log",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    accountNumber: {
      field: "accountNumber",
      type: Sequelize.DataTypes.INTEGER,
    },
    approval: {
      field: "approval",
      type: Sequelize.DataTypes.STRING,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATEONLY,
    },
  },
  {
    timestamps: false,
    tableName: "log",
  }
);

module.exports = log;
