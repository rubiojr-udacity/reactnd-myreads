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
    const filteredBooks = books.filter((book) => book.shelf === shelfName )
    const shelfBooks = filteredBooks.map((book) => (<li key={book.id}><Book bookShelfChanged={shelfChanged} {...book}/></li>))

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        {filteredBooks.length > 0 ? (
          <div className="bookshelf-books">
            <ol className="books-grid">
             {shelfBooks}
            </ol>
          </div>
        ) : ( <div>The shelf is empty</div> )
        }
      </div>
    )
  }
}

export default BookShelf
