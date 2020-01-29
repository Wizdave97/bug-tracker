'use strict';
module.exports = (sequelize, DataTypes) => {
  const Features = sequelize.define('Features', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    creator: DataTypes.INTEGER,
    edd: DataTypes.DATEONLY,
    type: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    contributor: DataTypes.INTEGER
  }, {});
  Features.associate = function(models) {
    // associations can be defined here
  };
  return Features;
};