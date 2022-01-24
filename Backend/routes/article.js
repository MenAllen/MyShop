const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const articleCtrl = require("../controllers/article");
const multer = require("../middleware/multer-config");
const validate = require("../middleware/valid-data");

// Déclaration des routes articles, avec authentification
router.post("/", auth, multer, articleCtrl.createArticle);
router.get("/", auth, articleCtrl.getAllArticles);
router.get("/:id", auth, validate.id, articleCtrl.getArticle);
router.get("/all/:id", auth, validate.id, articleCtrl.getAllArticlesForOne);
router.delete("/:id", auth, validate.id, articleCtrl.deleteArticle);

module.exports = router;
