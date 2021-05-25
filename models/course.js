const { DataTypes, Model } = require('sequelize');


module.exports = (sequelize) => {
        // model attributes
  const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
    Course.belongsTo(models.User, {
        foreignKey: {
            fieldName: 'userId',
            allowNull: false,
        }
    });
};

    
    return Course;
}