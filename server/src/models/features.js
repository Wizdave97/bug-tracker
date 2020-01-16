'use strict';
module.exports = (sequelize, DataTypes) => {
  const Features = sequelize.define('Features', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    creator: DataTypes.NUMBER,
    edd: DataTypes.DATEONLY,
    type: DataTypes.NUMBER,
    projectId: DataTypes.NUMBER,
    contributor: DataTypes.NUMBER
  }, {});
  Features.associate = function(models) {
    // associations can be defined here
  };
  return Features;
};