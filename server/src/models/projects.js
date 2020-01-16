'use strict';
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    creator: DataTypes.NUMBER,
    contributors: DataTypes.ARRAY,
    ecd: DataTypes.DATEONLY
  }, {});
  Projects.associate = function(models) {
    // associations can be defined here
  };
  return Projects;
};