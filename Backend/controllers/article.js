// La gestion des articles
const db = require("../models");
const Article = db.articles;

// POST Create Article
// ===================
exports.createArticle = (req, res, next) => {
	console.log("createArticle");

	console.log(req.user);
	console.log(req.body);

	let picture = "";
	if (req.file) {
		picture = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
	}
	const article = new Article ({
		UserId: req.user,
		articleDescription: req.body.description,
		articlePrice: req.body.price,
		articleUsername: req.body.username,
		articleUrl: picture,
	});

	article
		.save()
		.then(() => res.status(201).json({ message: "Article created" }))
		.catch((error) => res.status(400).json({ error }));
};

// GET all articles
// ================
exports.getAllArticles = (req, res, next) => {
	console.log("getAllArticles");

//	Article.findOne({ where: { id: 1 } })
	Article.findAll({
		order: [['createdAt', 'ASC' ]] ,
//  	include: [{
//				model: Article,
//				attributes: [ 'articleUrl' ],
//		}],
	})
		.then((results) => {
			console.log(results);
			res.status(200).json({ results });
		})
		.catch((error) => res.status(400).json({ error }));
};

// GET one article
// ================
exports.getArticle = (req, res, next) => {
	console.log("getArticle");

	Article.findOne({ where: { id: req.params.id } })
		.then((article) => {
			res.status(200).json(article);
		})
		.catch((error) => res.status(404).json({ error }));
};

// GET all articles for one user
// =============================
exports.getAllArticlesForOne = (req, res, next) => {
	console.log("getAllArticlesForOne");

	Article.findAll({ where: { UserId: req.params.id } })
		.then((articles) => {
			res.status(200).json({ articles });
		})
		.catch((error) => res.status(404).json({ error }));
};

// DEL article
// ===========
exports.deleteArticle = (req, res, next) => {
	console.log("deleteArticle");

	const paramId = parseInt(req.params.id);
	console.log(req.user);
	console.log(paramId);

	Article.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.status(200).json({ article: "Article(s) deleted" });
		})
		.catch((error) => res.status(400).json({ error }));
};
