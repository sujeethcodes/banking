const Sequelize = require("sequelize");
const DB = require("./index");
const Deposite = require("./deposite.model");
const WithDrawl = require("./withdrawl.model");

const accounts = DB.define(
  "accounts",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    aadharNo: {
      field: "aadharNo",
      type: Sequelize.DataTypes.INTEGER,
    },
    accountHolder: {
      field: "accountHolder",
      type: Sequelize.DataTypes.STRING,
    },
    accountNumber: {
      field: "accountNumber",
      type: Sequelize.DataTypes.INTEGER,
    },
    accountType: {
      field: "accountType",
      type: Sequelize.DataTypes.STRING,
    },
    balanceAmount: {
      field: "balanceAmount",
      type: Sequelize.DataTypes.STRING,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATEONLY,
    },
  },
  {
    timestamps: false,
    tableName: "accounts",
  }
);

accounts.belongsTo(Deposite, {
  foreignKey: "accountNumber",
  targetKey: "accountNumber",
  constraint: false,
});

accounts.belongsTo(WithDrawl, {
  foreignKey: "accountNumber",
  targetKey: "accountNumber",
  constraint: false,
});

module.exports = accounts;
