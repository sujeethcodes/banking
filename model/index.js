require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    logging: false,
    dialectModule: require("mysql2"),
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB_CONNECTED_SUCCESSFULLY");
  })
  .catch((error) => {
    console.log("unable to conect", error);
  });

module.exports = sequelize;
