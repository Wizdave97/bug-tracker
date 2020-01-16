'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false
      },
      mobileNumber: {
        type: Sequelize.STRING,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      verified:{
        allowNull:false,
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      projects:{
        allowNull:true,
        type:Sequelize.ARRAY,
      },
      features:{
        allowNull:true,
        type:Sequelize.ARRAY,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};