const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const orderCtrl = require("../controllers/order");
const validate = require("../middleware/valid-data");

// Déclaration des routes order, avec authentification
router.post("/", auth, orderCtrl.createOrder);

module.exports = router;
