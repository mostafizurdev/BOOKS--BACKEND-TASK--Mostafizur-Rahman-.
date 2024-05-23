const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');

// Display all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    res.render('books/index', { books });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.redirect('/books');
  } catch (err) {
    res.status(500).send(err);
  }
};
