const Sequelize = require("sequelize");
const DB = require("./index");

const deposite = DB.define(
  "deposite",
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
    deposite: {
      field: "deposite",
      type: Sequelize.DataTypes.INTEGER,
    },
    balanceAmount: {
      field: "balanceAmount",
      type: Sequelize.DataTypes.INTEGER,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATEONLY,
    },
  },
  {
    timestamps: false,
    tableName: "deposite",
  }
);

module.exports = deposite;
