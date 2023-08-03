"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prescription.init(
    {
      date: DataTypes.DATEONLY,
      customerName: DataTypes.STRING,
      customerAddress: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Prescription",
    }
  );
  return Prescription;
};
