'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
     
      return queryInterface.bulkInsert('Features', [{
        title: 'layout work',
        description: 'work on layout',
        status: 'open',
        creator: 0,
        edd: new Date().toLocaleDateString(),
        type: 0,
        projectId: 0,
        contributor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Authentication',
        description: 'work on authentication',
        status: 'open',
        creator: 0,
        edd: new Date().toLocaleDateString(),
        type: 0,
        projectId: 2,
        contributor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'layout work',
        description: 'work on layout',
        status: 'open',
        creator: 0,
        edd: new Date().toLocaleDateString(),
        type: 0,
        projectId: 1,
        contributor: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'layout work',
        description: 'work on layout',
        status: 'open',
        creator: 0,
        edd: new Date().toLocaleDateString(),
        type: 0,
        projectId: 0,
        contributor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Sign Up bug',
        description: 'No verification on sign up',
        status: 'open',
        creator: 0,
        edd: new Date().toLocaleDateString(),
        type: 1,
        projectId: 1,
        contributor: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'layout work',
        description: 'work on layout',
        status: 'open',
        creator: 0,
        edd: new Date().toLocaleDateString(),
        type: 0,
        projectId: 0,
        contributor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'layout work',
        description: 'work on layout',
        status: 'open',
        creator: 0,
        edd: new Date().toLocaleDateString(),
        type: 0,
        projectId: 1,
        contributor: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'layout work',
        description: 'work on layout',
        status: 'open',
        creator: 0,
        edd: new Date().toLocaleDateString(),
        type: 0,
        projectId: 3,
        contributor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'layout work',
        description: 'work on layout',
        status: 'open',
        creator: 0,
        edd: new Date().toLocaleDateString(),
        type: 0,
        projectId: 2,
        contributor: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Features', null, {});
    
  }
};
