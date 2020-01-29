'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
      type:DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull:true,
    },
    features:{
      type:DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull:true
    }
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};