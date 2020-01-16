'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Features', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      status: {
        type: Sequelize.STRING,
        allowNull:false
      },
      creator: {
        type: Sequelize.NUMBER,
        allowNull:false
      },
      edd: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      type: {
        type: Sequelize.NUMBER,
        allowNull:false
      },
      projectId: {
        type: Sequelize.NUMBER,
        allowNull:false
      },
      contributor: {
        type: Sequelize.NUMBER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Features');
  }
};