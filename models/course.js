const { DataTypes, Model } = require('sequelize');


module.exports = (sequelize) => {
        // model attributes
  const Course = sequelize.define('Course', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    estimatedTime: {
        type: DataTypes.STRING
    },
    materialsNeeded: {
        type: DataTypes.STRING
    },
},{sequelize});

Course.associate = (models) => {
    Course.belongsTo(models.User);
};

    
    return Course;
}