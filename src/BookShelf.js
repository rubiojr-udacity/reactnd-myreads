import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

import Book from './Book'

class BookShelf extends Component {
  state = {
    query: '',
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ books })
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  shelfChanged = (book) => {
    var books = this.state.books.map((b) => {
      if (book.id === b.id) {
        b.shelf = book.shelf
      }
      BooksAPI.update(book, book.shelf)
      return b
    })
    this.setState({ books: books })
  }

  render() {
    const { books } = this.state
    const { query } = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.name))
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('name'))

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
	          {books.filter((book) => book.shelf === "currentlyReading").map((book) => (<li key={book.id}><Book bookShelfChanged={this.shelfChanged} {...book}/></li>))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
	          {books.filter((book) => book.shelf === "wantToRead").map((book) => (<li key={book.id}><Book bookShelfChanged={this.shelfChanged} {...book}/></li>))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
	          {books.filter((book) => book.shelf === "read").map((book) => (<li key={book.id}><Book bookShelfChanged={this.shelfChanged} {...book}/></li>))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelf
