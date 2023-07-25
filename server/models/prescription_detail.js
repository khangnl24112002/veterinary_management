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
      Prescription_Detail.belongsTo(models.Prescription, {
        foreignKey: "prescriptionId",
        targetKey: "id",
      });
      Prescription_Detail.hasMany(models.Drug, {
        foreignKey: "drugId",
        targetKey: "id",
      });
    }
  }
  Prescription_Detail.init(
    {
      quantity: DataTypes.INTEGER,
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
