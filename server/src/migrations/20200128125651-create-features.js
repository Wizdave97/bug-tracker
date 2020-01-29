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
        type: Sequelize.INTEGER,
        allowNull:false
      },
      edd: {
        type: Sequelize.STRING,
        allowNull:false
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      contributor: {
        type: Sequelize.INTEGER
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