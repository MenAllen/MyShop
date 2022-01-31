// La gestion des orders
const db = require("../models");
const Order = db.orders;

// POST Create Order
// =================
exports.createOrder = (req, res, next) => {
	console.log("createOrder");

  let len = req.body.articles.length;
  let ordertab = [];

  for (let i=0; i < len; i++) {

    ordertab[i] = new Order ({
      username: req.body.username,
      date: Date.now(),
      totalprice: req.body.totalprice,
      type: req.body.articles[i].articleType,
      titre: req.body.articles[i].articleTitre,
      price: req.body.articles[i].articlePrice,
      quantity: req.body.articles[i].articleQuantity
    });

    ordertab[i]
		.save()
		.then(() => res.status(201).json({ message: "Order created" }))
		.catch((error) => res.status(400).json({ error }));

  }

};