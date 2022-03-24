"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    get formatDate() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return this.createdAt.toLocaleDateString("en-EN", options);
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      Post.belongsTo(models.Tag);
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "title can't be empty",
          },
          notEmpty: {
            args: true,
            msg: "title can't be empty",
          },
          len: {
            args: [5, 50],
            msg: 'Title must be 5 - 50 characters'
          }
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "description can't be empty",
          },
          notEmpty: {
            args: true,
            msg: "description can't be empty",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "imageUrl can't be empty",
          },
          notEmpty: {
            args: true,
            msg: "imageUrl can't be empty",
          },
        },
      },
      TagId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      postCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
      hooks: {
        beforeCreate: (post) => {
          post.postCode = `${post.title.toLowerCase().replace(' ','_').slice(post.title.length - 4)}_${post.UserId}`;
        },
      },
    }
  );
  return Post;
};
