"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Drug_Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Drug_Warehouse.init(
    {
      quantity: DataTypes.INTEGER,
      unitPrice: DataTypes.INTEGER,
      drugId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Drug_Warehouse",
    }
  );
  return Drug_Warehouse;
};
