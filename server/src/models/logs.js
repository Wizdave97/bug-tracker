'use strict';
module.exports = (sequelize, DataTypes) => {
  const Logs = sequelize.define('Logs', {
    user: DataTypes.INTEGER,
    description: DataTypes.STRING,
    featureId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  Logs.associate = function(models) {
    // associations can be defined here
  };
  return Logs;
};