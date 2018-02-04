import React, {Component} from 'react'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import {NotificationManager} from 'react-notifications'

class BookList extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    NotificationManager.info('Retrieving books...', '', 1000)
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  shelfChanged = (book) => {
    this.setState(prev => {
      for (var b of prev.books) {
        if (book.id !== b.id) {
          continue
        }
        b.shelf = book.shelf
        BooksAPI.update(book, book.shelf)
        NotificationManager.success('Book updated', '', 1000)
        break
      }
      return {books: prev.books}
    })
  }

  render() {
    const {books} = this.state
    const shelfChanged = this.shelfChanged

    return (<div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <BookShelf shelfChanged={shelfChanged} shelfName='currentlyReading' books={books} title={'Currently Reading'}/>
          <BookShelf shelfChanged={shelfChanged} shelfName='wantToRead' books={books} title={'Want to Read'}/>
          <BookShelf shelfChanged={shelfChanged} shelfName='read' books={books} title={'Read'}/>
        </div>
      </div>
    </div>)
  }
}

export default BookList
