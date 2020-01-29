'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [{
      title: 'Bug tracker',
      description:'An app for tracking app development',
      status: 'open',
      creator: 0,
      contributors: [JSON.stringify({role:0,userId:0}),JSON.stringify({role:1,userId:1}),JSON.stringify({role:1,userId:2})],
      ecd: new Date().toLocaleDateString(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Church Home Cell App',
      description:'An app for managing church home cell',
      status: 'open',
      creator: 0,
      contributors: [JSON.stringify({role:0,userId:0}),JSON.stringify({role:1,userId:1}),JSON.stringify({role:1,userId:2})],
      ecd: new Date().toLocaleDateString(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Todo List',
      description:'An app for tracking app daily tasks',
      status: 'open',
      creator: 0,
      contributors: [JSON.stringify({role:0,userId:0}),JSON.stringify({role:1,userId:1}),JSON.stringify({role:1,userId:2})],
      ecd: new Date().toLocaleDateString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkDelete('Projects', null, {});
    
  }
};
