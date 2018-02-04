import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfChanged: PropTypes.func.isRequired,
    displayHeader: PropTypes.bool.isRequired,
    emptyMsg: PropTypes.string
  }

  render() {
    const {emptyMsg, title, shelfName, shelfChanged, displayHeader, books} = this.props;
    let filteredBooks = books;
    if (shelfName !== "") {
      filteredBooks = books.filter((book) => book.shelf === shelfName );
    }
    const shelfBooks = filteredBooks.map((book) => (<li key={book.id}><Book bookShelfChanged={shelfChanged} {...book}/></li>));

    return (
      <div className='bookshelf'>
        { displayHeader && (<h2 className='bookshelf-title'>{title}</h2>) }
        {filteredBooks.length > 0 ? (
          <div className='bookshelf-books'>
            <ol className='books-grid'>
              {shelfBooks}
            </ol>
          </div>
        ) : ( <div>{emptyMsg}</div> )
        }
      </div>
    )
  }
}

// Specifies the default values for props:
BookShelf.defaultProps = {
  emptyMsg: 'The shelf is empty',
  displayHeader: true
};

export default BookShelf
