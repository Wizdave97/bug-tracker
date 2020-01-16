'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define('Tokens', {
    token: DataTypes.STRING,
    expiresIn: DataTypes.BIGINT,
    userId: DataTypes.NUMBER
  }, {});
  Tokens.associate = function(models) {
    // associations can be defined here
  };
  return Tokens;
};