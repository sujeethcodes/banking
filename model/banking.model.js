const Sequelize = require("sequelize");
const DB = require("./index");

const bank = DB.define(
  "bank",
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

    approved: {
      field: "approved",
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "bank",
  }
);

module.exports = bank;
