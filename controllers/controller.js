const { User, Profile, Post, Tag } = require('../models/index');

class Controller{
    static Home(req, res){
        res.render("home");
    }
    static Profile(req, res){
        let id = req.params.userId;
        Profile.findByPk(id)
        .then((data)=>{
            res.render('Profile', {data})
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    static profileEdit(req, res){
        let id = req.params.userId;
        Profile.findByPk(id)
        .then((data)=>{
            res.render('formEditProfile', {data})
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    static profileEditPost(req, res){
        let id = req.params.userId;
        let newData={
            fullName: req.body.fullName,
            photoProfile: req.body.photoProfile,
            birthDate: req.body.birthDate
        }
        Profile.update(newData,{where:{id}})
        .then(()=>{
            res.redirect(`/profile/${id}`)
        })
        .catch((err)=>{
            console.log("err: ", err);
            res.send(err)
        })
    }

    static post(req, res) {
        Post.findAll({
            include: [ User, Tag ]
        })
            .then(posts => {
                res.render('Posts', { posts })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static detailPost(req, res) {
        const { postId } = req.params
        Post.findOne({
            include: [ User, Tag ],
            where: {
                id: postId
            }
        })
            .then(post => {
                res.render('detailPost', { post })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postProfile(req, res) {
        const { userId } = req.params
        Post.findAll({
            include: Tag,
            where: {
                UserId: userId
            }
        })
            .then(posts => {
                res.render("postProfile", { posts })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller;