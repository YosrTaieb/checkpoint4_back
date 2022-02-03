import express from 'express';
import Joi from 'joi';
const router = express.Router(); 
import Article from "../models/articleModel.js";

const schemaArticle = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  id_category: Joi.number().integer().required(),
});

// Dans ce controller, toutes les routes commencent par /home cf(routes/routings.js L:8)
router.get("/", async (req, res) => {
    try {
      // On récupère toutes les articles depuis le model qui lui meme connect avec la base de données
      const articles = await Article.getAll();
      // On envoie les données récupérées au client
      res.json(articles);
    } catch (error) {
      // sinon erreur 500
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const article = await Article.getOneById(id);
      article
        ? res.json(article)
        : res.status(404).json({ message: `Article not found` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/", async (req, res) => {
    const { title, description, date, id_category } = req.body;
    try {
      const { error, value } = await schemaArticle.validate({
        title,
        description,
        date,
        id_category,
      });
      const lastInsertId = await Article.createNew(value);
      console.log(lastInsertId);
      if (lastInsertId) {
        const newArticle = await Article.getOneById(lastInsertId);
        res.json(newArticle);
      } else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Article.deleteById(id);
      result
        ? res.json({ message: `The article ${id} has been deleted !` })
        : res.status(404).json({ message: "Article not found" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    const { title, description, date, id_category } = req.body;
    try {
      const { error, value } = await schemaArticle.validate({
        title,
        description,
        date,
        id_category,
      });
      const articleUpdate = await Article.updateArticle(req.params.id, value);
      if (articleUpdate) res.json(value);
      else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });




export default router;