const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = ( sequelize ) => {
    const User = sequelize.define( 'User', {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notNull: {
            msg: 'A name is required'
          },
          notEmpty: {
            msg: 'Please provide a name'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
      },
      emailAddress: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          //storing the passwords hashed for more protection.
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        }
      }
    }, {
      sequelize
    } );
    User.associate = ( models ) => {
      User.hasMany( models.Course, {
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
      }});
    };
    return User;
  }