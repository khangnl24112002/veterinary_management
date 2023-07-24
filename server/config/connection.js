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

export const connectionDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
