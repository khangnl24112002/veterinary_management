"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exam_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exam_History.init(
    {
      date: DataTypes.DATEONLY,
      animalType: DataTypes.STRING,
      symptom: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
      examScheduleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Exam_History",
    }
  );
  return Exam_History;
};
