'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName:'Doe',
        mobileNumber:'08163458664',
        email:'wizdave97@gmail.com',
        password:'a1d5316ce927c5dd197422075d3f5fd8c760c6f69a2a729afde957544aa8e790',
        projects:[0,1,2,3],
        features:[0,1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Steve',
        lastName:'Jobs',
        mobileNumber:'08163458664',
        email:'stevejobs96@gmail.com',
        password:'a1d5316ce927c5dd197422075d3f5fd8c760c6f69a2a729afde957544aa8e790',
        projects:[2,3],
        features:[4,5],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'James',
        lastName:'Lebron',
        mobileNumber:'08163458664',
        email:'lebronjames95@gmail.com',
        password:'a1d5316ce927c5dd197422075d3f5fd8c760c6f69a2a729afde957544aa8e790',
        projects:[0,1,2],
        features:[2,3],
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});
    
  }
};
