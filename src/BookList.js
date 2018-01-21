import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class BookList extends Component {
  state = {
    query: '',
    books: []
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

  render() {
    const { books, query } = this.state
    
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
            <BookShelf shelfChanged={this.shelfChanged} shelfName="currentlyReading" books={books} title={"Currently Reading"} />
            <BookShelf shelfChanged={this.shelfChanged} shelfName="wantToRead" books={books} title={"Want to Read"} />
            <BookShelf shelfChanged={this.shelfChanged} shelfName="read" books={books} title={"Read"} />
          </div>
        </div>
      </div>
    )
  }
}

export default BookList
