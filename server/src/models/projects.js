'use strict';
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type:DataTypes.ENUM,
      values:['open','closed'],
    },
    creator: DataTypes.INTEGER,
    contributors: DataTypes.ARRAY(DataTypes.STRING),
    ecd: DataTypes.STRING
  }, {});
  Projects.associate = function(models) {
    // associations can be defined here
  };
  return Projects;
};