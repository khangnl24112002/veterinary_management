import Sequelize from "sequelize";
const sequelize = new Sequelize(
  "veterinary_management", // TutorialsPoint
  "root", // root
  "khangnl2131", //root
  {
    dialect: "mysql",
    host: "localhost",
    logging: false,
  }
);
