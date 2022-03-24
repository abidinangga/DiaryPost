const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.Profile);
router.get("/edit", Controller.profileEdit);
router.post("/edit", Controller.profileEditPost);
router.get("/post", Controller.postProfile);
router.get("/post/create", Controller.addPost);
router.post("/post/create", Controller.createPost);
router.get("/post/:postId/edit", Controller.editPost);
router.post("/post/:postId/edit", Controller.savePost);
router.get("/post/:postId/delete", Controller.deletePost);

module.exports = router;
