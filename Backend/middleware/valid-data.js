const Joi = require("joi");

// Id d'article passé en paramètre
const articleIdSchema = Joi.string().alphanum().required();
exports.id = (req, res, next) => {
	const { error } = articleIdSchema.validate(req.params.id);
	if (error) {
		res.status(400).json({ error: " Joi: Invalid Article Id" });
	} else {
		next();
	}
};

// Modele d'article
const articleSchema = Joi.object({
	userId: Joi.string().alphanum().length(24).required(),
	type: Joi.string().trim().min(1).required(),
	description: Joi.string().trim().min(1).required(),
	price: Joi.number().integer().min(1).max(1000000).required(),
	quantity: Joi.number().integer().min(1).max(1000000).required(),
	username: Joi.string().trim().min(3).required(),
});
exports.article = (req, res, next) => {
	let article;

	// format différent si fichier image présent
	if (req.file) {
		article = JSON.parse(req.body.article);
	} else {
		article = req.body;
	}

	const { error } = articleSchema.validate(article);
	if (error) {
		res.status(400).json({ error: "Joi: Invalid Article Data" });
	} else {
		next();
	}
};

// like / dislike
const likeSchema = Joi.object({
	userId: Joi.string().alphanum().length(24).required(),
	like: Joi.valid(-1, 0, 1).required(),
});
exports.like = (req, res, next) => {
	const { error } = likeSchema.validate(req.body);
	if (error) {
		res.status(400).json({ error: "Joi: Invalid userId or like Data" });
	} else {
		next();
	}
};

// Signup et Login
// email : format email avec 2 domains segments (example.com)
// password : au moins 8 caractères, au moins une minuscule, au moins une majuscule, au moins un chiffre

const userSchema = Joi.object({
	email: Joi.string().trim().email({ minDomainSegments: 2 }),
	password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z](?=.*[0-9])).{8,}$")),
	username: Joi.string().trim().min(3).required(),
});
exports.user = (req, res, next) => {
	console.log(req.body.username, req.body.password);
	const { error } = userSchema.validate(req.body);
	if (error) {
		res.status(400).json({ error: "Joi: Invalid username or password" });
	} else {
		next();
	}
};
