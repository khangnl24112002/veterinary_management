"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.Account, {
        foreignKey: "accountId",
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      accountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
