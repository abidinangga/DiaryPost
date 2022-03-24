'use strict';
const {
  Model
} = require('sequelize');
const bcrypt  = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
    }
  }
  User.init({
    username:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:{msg:"username already exists"},
      validate: {
        notNull: {
          msg:"username can't be empty"
        },
        len: {
          args: [5, 20],
          msg: "username length must be 5 - 20 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:{msg:"email already exists"},
      validate: {
        notNull: {
          msg:"email can't be empty"
        },
        notEmpty:{
          args:true,
          msg:"email can't be empty"
        },
        isEmail:{msg:"type email is not valid"}
      }
    },
    password: {
     type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg:"password can't be empty"
        },
        len :{
          args:[8,20],
          msg:"password must be between 8 and 20 characters"
        },
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
      user.role ='User'
    }
  },
    sequelize,
    modelName: 'User',
  })
  return User;
};