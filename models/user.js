const { DataTypes, Model } = require('sequelize');


module.exports = (sequelize) => {
        // model attributes
      const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        emailAddress: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }},{sequelize}); 

        User.associate = (models) => {
            User.hasMany(models.Course);
        };
        
    return User;
}
