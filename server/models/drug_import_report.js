"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Drug_Import_Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Drug_Import_Report.hasMany(models.Import_Report_Detail);
      // define association here
    }
  }
  Drug_Import_Report.init(
    {
      date: DataTypes.DATEONLY,
      seller: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Drug_Import_Report",
    }
  );
  return Drug_Import_Report;
};
