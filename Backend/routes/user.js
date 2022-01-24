const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/valid-data");

const userCtrl = require("../controllers/user");

// Déclaration des routes user, sans authentification
router.post("/signup", validate.user, userCtrl.signup);
router.post("/signout", validate.user, userCtrl.signout);
router.post("/login", validate.user, userCtrl.login);

// Déclaration des routes user, avec authentification
router.get("/:id", auth, userCtrl.getUser);
router.get("/", auth, userCtrl.getAllUsers);
router.delete("/", auth, userCtrl.deleteUser);
router.delete("/:id", auth, userCtrl.deleteMyAccount);

module.exports = router;
