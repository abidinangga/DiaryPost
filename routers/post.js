const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get('/', Controller.post)
router.get('/:postId/detail', Controller.detailPost)
router.get('/')

module.exports = router;