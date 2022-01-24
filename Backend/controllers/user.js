// in controllers/user.js
const bcrypt = require("bcrypt"); // module de cryptage SHA1 pour password
const jwt = require("jsonwebtoken"); // module d'authentification par token
const database = require("../models"); // bdd definition
const User = database.users;
const { Op } = require("sequelize");

// POST pour signup d'un nouvel utilisateur
// ========================================
exports.signup = (req, res, next) => {
	console.log("signup");

	bcrypt
		.hash(req.body.password, 10) // password hashé
		.then((hash) => {
			const user = new User({
				username: req.body.username,
				email: req.body.email,
				password: hash,
			});
			user
				.save() // Tentative de sauvegarde en base

				// Sauvegarde OK
				.then((user) => {
					if (user) {
						res.status(201).json({ message: "User created !" });
					}
				})

				// Erreur 400 Bad Request: Erreur de validation si user existe
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

// POST pour login d'un utilisateur
// ================================
exports.login = (req, res, next) => {
	console.log("login");

	User.findOne({
		where: {
			username: req.body.username,
		},
	})
		.then((user) => {
			if (!user) {
				// l'utilisateur n'existe pas
				return res.status(404).json({ message: "Invalid credential !" });
			}
			bcrypt // L'utilisateur existe, on vérifie que le password est le bon
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						// l'utilisateur existe mais le password ne correspond pas
						return res.status(401).json({ message: "Invalid credential !" });
					}
					res.status(200).json({
						// l'utilisateur existe et le password est le bon
						userId: user.id,
						role: user.isAdmin,
						email: user.email,
						token: jwt.sign({ userId: user.id }, process.env.TOKEN, { expiresIn: "24h" }),
					});
				}) // Erreur bcrypt.compare
				.catch((error) => res.status(500).json({ error }));
		}) // Erreur findOne
		.catch((error) => res.status(500).json({ error }));
};

// POST pour logout d'un utilisateur
// ================================
exports.signout = (req, res, next) => {
	console.log("signout");

	User.findOne({
		where: {
			username: req.body.username,
		},
	})
		.then((user) => {
			if (!user) {
				// l'utilisateur n'existe pas
				return res.status(404).json({ message: "Invalid credential !" });
			} else {
				res.status(200).json();
			}
		}) // Erreur findOne
		.catch((error) => res.status(500).json({ error }));
};


// GET info un User
// ================
exports.getUser = (req, res, next) => {
	console.log("getUser");

	User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => res.status(404).json({ error }));
};

// GET info All Users
// ==================
exports.getAllUsers = (req, res, next) => {
	User.findAll({
		where: { id: { [Op.gt]: 0 } },
	})
		.then((AllUserdata) => {
			res.status(200).json({ AllUserdata });
		})
		.catch((error) => {
			res.status(400).json({ error });
		});
};

// DELETE one User
// ===============
exports.deleteUser = (req, res, next) => {
	console.log(req.query);
};

// DELETE my Account
// =================
exports.deleteMyAccount = (req, res, next) => {};
