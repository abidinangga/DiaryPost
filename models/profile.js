'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
    static calcAge(dateString) {
      let birthday = +new Date(dateString);
      return ~~((Date.now() - birthday) / (31557600000));
    }
  }
  Profile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "fullName can't be empty",
      },
      notEmpty: {
        args: true,
        msg: "fullName can't be empty",
      }
    }
  },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {msg: "Birth Date can't be empy"},
        notEmpty: {
          args: true,
          msg: "Birth Date can't be empty",
        }
      },
    },  
    gender: DataTypes.STRING,
    photoProfile: DataTypes.STRING,
    UserId:DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: ((profile) => {
        profile.photoProfile = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        profile.gender = 'Male'
      })
    },
    modelName: 'Profile',
  });
  return Profile;
};