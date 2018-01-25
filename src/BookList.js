import React, { Component } from 'react';
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class BookList extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  shelfChanged = (book) => {
    for (var b of this.state.books) {
      if (book.id !== b.id) {
        continue
      }
      b.shelf = book.shelf
      this.setState({ books: this.state.books })
      BooksAPI.update(book, book.shelf)
      console.log("book shelf updated remotely")
      break
    }
  }

  render() {
    const { books } = this.state
    const shelfChanged = this.shelfChanged

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf shelfChanged={shelfChanged} shelfName="currentlyReading" books={books} title={"Currently Reading"} />
            <BookShelf shelfChanged={shelfChanged} shelfName="wantToRead" books={books} title={"Want to Read"} />
            <BookShelf shelfChanged={shelfChanged} shelfName="read" books={books} title={"Read"} />
          </div>
        </div>
      </div>
    )
  }
}

export default BookList
