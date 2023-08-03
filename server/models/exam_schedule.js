"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exam_Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exam_Schedule.init(
    {
      date: DataTypes.DATEONLY,
      animalType: DataTypes.STRING,
      symptom: DataTypes.STRING,
      isOk: DataTypes.BOOLEAN,
      customerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Exam_Schedule",
    }
  );
  return Exam_Schedule;
};
