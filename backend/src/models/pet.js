"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Pet.belongsTo(models.User, {
        foreignKey: "ownerId", // ownerId sẽ liên kết với id của bảng User
        as: "ownerData",
      });
    }
  }
  Pet.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      breed: DataTypes.STRING,
      weight: DataTypes.FLOAT,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      ownerId: DataTypes.STRING,// Liên kết với bảng User
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
