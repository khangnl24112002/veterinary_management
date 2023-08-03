"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exam_History_Drugs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exam_History_Drugs.init(
    {
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      examHistoryId: DataTypes.INTEGER,
      drugId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Exam_History_Drugs",
    }
  );
  return Exam_History_Drugs;
};
