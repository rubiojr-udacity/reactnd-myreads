import React, { Component } from 'react';
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfChanged: PropTypes.func.isRequired
  }

  render() {
    const {title, shelfName, shelfChanged, books} = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
      {books.filter((book) => book.shelf === shelfName ).map((book) => (<li key={book.id}><Book bookShelfChanged={shelfChanged} {...book}/></li>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
