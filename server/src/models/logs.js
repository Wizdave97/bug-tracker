'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Logs', {
    user: DataTypes.NUMBER,
    description: DataTypes.STRING,
    featureId: DataTypes.NUMBER,
    projectId: DataTypes.NUMBER
  }, {});
  Log.associate = function(models) {
    // associations can be defined here
  };
  return Logs;
};