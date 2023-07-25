"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Drug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Drug.belongsTo(models.Exam_History_Drugs, {
        sourceKey: "id",
        targetKey: "drugId",
      });
      Drug.belongsTo(models.Import_Report_Detail, {
        sourceKey: "id",
        targetKey: "drugId",
      });
      Drug.belongsTo(models.Drug_Warehouse, {
        sourceKey: "id",
        targetKey: "drugId",
      });
      Drug.belongsTo(models.Prescription_Detail, {
        sourceKey: "id",
        targetKey: "drugId",
      });
    }
  }
  Drug.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      usage: DataTypes.STRING,
      dosage: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Drug",
    }
  );
  return Drug;
};
