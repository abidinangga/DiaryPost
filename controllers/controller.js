const { User, Profile, Post, Tag } = require("../models/index");
const bcrypt = require("bcryptjs");
const { date } = require("../helpers/index");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
class Controller {
  static Home(req, res) {
    res.render("home");
  }
  static register(req, res) {
    res.render("formRegister");
  }
  static saveRegister(req, res) {
    const { username, email, password } = req.body;
    User.create({ username, email, password })
      .then(() => {
        nodemailer.createTestAccount((err, account) => {});
        res.redirect("/");
      })

      .catch((err) => {
        err = err.errors.map(el => el.message)
        res.send(err);
      });
  }
  static login(req, res) {
    const { username, password } = req.body;
    User.findOne({
      include: Profile,
      where: { username: username },
    })
      .then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          let id = user.id;
          req.session.UserId = id;
          if (!user.Profile) {
            res.redirect(`/profile/add`);
          } else {
            res.redirect(`/profile`);
          }
        } else {
          res.send("Password Salah");
        }
      })
      .catch((err) => {
        console.log("err: ", err);
        res.send(err);
      });
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }

  static addProfile(req, res) {
    res.render("formcreateProfile");
  }

  static saveProfile(req, res) {
    const { fullName, gender, birthDate, photoProfile } = req.body;
    const { UserId } = req.session;
    const newProfile = {
      fullName,
      gender,
      birthDate,
      photoProfile,
      UserId,
    };
    Profile.create(newProfile)
      .then(() => {
        res.redirect(`/profile/`);
      })
      .catch((err) => {
        err = err.errors.map((el) => el.message);
        res.send(err);
      });
  }

  static Profile(req, res) {
    let id = req.session.UserId;

    Profile.findByPk(id)
      .then((data) => {
        let age = Profile.calcAge(data.birthDate);
        res.render("Profile", { data, date, age });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static profileEdit(req, res) {
    let id = req.session.UserId;
    Profile.findByPk(id)
      .then((data) => {
        res.render("formEditProfile", { data, date });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static profileEditPost(req, res) {
    let id = req.session.UserId;
    let newData = {
      fullName: req.body.fullName,
      photoProfile: req.body.photoProfile,
      birthDate: req.body.birthDate,
    };
    Profile.update(newData, { where: { id } })
      .then(() => {
        res.redirect(`/profile`);
      })
      .catch((err) => {
        err = err.errors.map(el => el.message);
        res.send(err);
      });
  }

  static post(req, res) {
    let search = req.query.title;
    let option = {
      include: [User, Tag],
      where: {},
    };
    if (search) {
      option.where = {
        ...option.where,
        title: { [Op.iLike]: `%${search}%` },
      };
    }
    Post.findAll(option)
      .then((posts) => {
        res.render("Posts", { posts });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static detailPost(req, res) {
    const { postId } = req.params;
    Post.findOne({
      include: [User, Tag],
      where: {
        id: postId,
      },
    })
      .then((post) => {
        res.render("detailPost", { post, date });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postProfile(req, res) {
    const UserId = req.session.UserId;
    Post.findAll({
      include: Tag,
      where: {
        UserId: UserId,
      },
    })
      .then((posts) => {
        res.render("postProfile", { posts, date });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static editPost(req, res) {
    const { postId } = req.params;
    Post.findOne({
      where: {
        id: postId,
      },
    })
      .then((post) => {
        res.render("editPost", { post });
      })
      .catch((err) => {
        err = err.errors.map(el => el.message);
        res.send(err);
      });
  }

  static savePost(req, res) {
    const { title, imageUrl, description } = req.body;
    const { postId } = req.params;
    const userId = req.session.UserId;
    const newPost = {
      title,
      imageUrl,
      description,
    };

    Post.update(newPost, {
      where: {
        id: postId,
      },
    })
      .then(() => {
        res.redirect(`/profile/post`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addPost(req, res) {
    Tag.findAll()
      .then((tags) => {
        res.render("formAddPost", { tags });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static createPost(req, res) {
    let id = req.session.UserId;
    const { title, imageUrl, description, TagId } = req.body;
    const newPost = {
      title,
      imageUrl,
      description,
      TagId,
      UserId: id,
    };
    console.log("newPost: ", newPost);
    Post.create(newPost)
      .then(() => {
        res.redirect(`/profile/post`);
      })
      .catch((err) => {
        err = err.errors.map(el => el.message);
        res.send(err);
      });
  }
  static deletePost(req, res) {
    const { postId } = req.params;
    Post.destroy({
      where: {
        id: postId,
      },
    })
      .then(() => {
        res.redirect(`/profile/post`);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
