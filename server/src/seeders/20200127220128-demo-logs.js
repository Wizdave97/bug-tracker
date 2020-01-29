'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Logs', [{
        user: 0,
        description: 'Assigned feature-0 to John Doe',
        featureId: null,
        projectId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Added  Steve Jobs as contributor',
        featureId: null,
        projectId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Assigned feature-2 to Steve Jobs',
        featureId: null,
        projectId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Added Lebron James as a contributor',
        featureId: null,
        projectId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 1,
        description: 'Made a comment: Working hard on feature-0',
        featureId: 0,
        projectId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 2,
        description: 'Made a comment: Working hard on feature-2',
        featureId: 0,
        projectId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Assigned feature-3 to Lebron James',
        featureId: null,
        projectId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Made a comment: Working hard on feature-2',
        featureId: 3,
        projectId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Added  Steve Jobs as contributor',
        featureId: null,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Assigned feature-2 to Steve Jobs',
        featureId: null,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Added Lebron James as a contributor',
        featureId: null,
        projectId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 1,
        description: 'Made a comment: Working hard on feature-0',
        featureId: 0,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 1,
        description: 'Made a comment: Working hard on feature-2',
        featureId: 0,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Assigned feature-3 to Lebron James',
        featureId: null,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 2,
        description: 'Made a comment: Working hard on feature-3',
        featureId: 3,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Added  Steve Jobs as contributor',
        featureId: null,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Assigned feature-2 to Steve Jobs',
        featureId: null,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Added Lebron James as a contributor',
        featureId: null,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 1,
        description: 'Made a comment: Working hard on feature-0',
        featureId: 0,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 1,
        description: 'Made a comment: Working hard on feature-2',
        featureId: 2,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 0,
        description: 'Assigned feature-3 to Lebron James',
        featureId: null,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 2,
        description: 'Made a comment: Working hard on feature-3',
        featureId: 3,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Logs', null, {});
    
  }
};
