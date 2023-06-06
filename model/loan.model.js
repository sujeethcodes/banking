const Sequelize = require("sequelize");
const Accounts = require("./accounts.model");
const DB = require("./index");

const loan = DB.define(
  "loan",
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

    loanApply: {
      field: "loanApply",
      type: Sequelize.DataTypes.STRING,
    },
    approval: {
      field: "approval",
      type: Sequelize.DataTypes.STRING,
      default: "pending",
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATEONLY,
    },
  },
  {
    timestamps: false,
    tableName: "loan",
  }
);

loan.belongsTo(Accounts, {
  foreignKey: "accountNumber",
  targetKey: "accountNumber",
  constraint: false,
});

module.exports = loan;
