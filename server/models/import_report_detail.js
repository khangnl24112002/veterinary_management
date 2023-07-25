"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Import_Report_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Import_Report_Detail.hasOne(models.Drug, {
        foreignKey: "drugId",
        targetKey: "id",
      });
      Import_Report_Detail.hasOne(models.Drug_Import_Report, {
        foreignKey: "drugImportReportId",
        targetKey: "id",
      });
    }
  }
  Import_Report_Detail.init(
    {
      quantity: DataTypes.INTEGER,
      unitPrice: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      drugId: DataTypes.INTEGER,
      drugImportReportId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Import_Report_Detail",
    }
  );
  return Import_Report_Detail;
};
