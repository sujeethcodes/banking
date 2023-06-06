const Sequelize = require("sequelize");
const DB = require("./index");

const withdrawl = DB.define(
  "withdrawl",
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
    withdrawl: {
      field: "withdrawl",
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
    tableName: "withdrawl",
  }
);

module.exports = withdrawl;
