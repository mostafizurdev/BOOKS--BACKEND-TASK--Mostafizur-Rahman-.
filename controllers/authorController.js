const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// Display all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.render('authors/index', { authors });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new author
exports.createAuthor = async (req, res) => {
  const author = new Author(req.body);
  try {
    await author.save();
    res.redirect('/authors');
  } catch (err) {
    res.status(500).send(err);
  }
};
