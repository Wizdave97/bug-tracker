'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:true
      }
    },
    mobileNumber: DataTypes.STRING,
    password: {
      type:DataTypes.STRING,
      validate:{
        isAlphanumeric:true
      }
    },
    projects:{
      type:DataTypes.Array,
      allowNull:true,
    },
    features:{
      type:DataTypes.Array,
      allowNull:true
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};