"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prescription_Detail.hasOne(models.Drug, {
        foreignKey: "id",
        sourceKey: "drugId",
      });
    }
  }
  Prescription_Detail.init(
    {
      quantity: DataTypes.INTEGER,
      unitPrice: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      drugId: DataTypes.INTEGER,
      prescriptionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Prescription_Detail",
    }
  );
  return Prescription_Detail;
};
