import React, { Component } from 'react'
import BookShelf from './BookShelf'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

const SEARCH_TERMS = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

class SearchBar extends Component {

  state = {
    query: '',
    found: []
  }

  validSearchTerm(term) {
    let match = new RegExp(escapeRegExp(term), 'i')
    for (var t of SEARCH_TERMS) {
      if (match.test(t)) {
        return true
      }
    }
    return false
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    if (query && (query.length > 1) && this.validSearchTerm(query)) {
      BooksAPI.search(query).then((books) => {
        this.setState({ found: books})
      })
    } else {
      this.setState({ found: [] })
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  shelfChanged = (book) => {
    BooksAPI.update(book, book.shelf)
  }

  render () {
    const { found, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"/>
          <div className="search-books-input-wrapper">
            <input type="text"
                   placeholder="Search by title or author"
                   value={query}
                   onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookShelf shelfChanged={this.shelfChanged}
                       displayHeader={false}
                       shelfName=""
                       emptyMsg="No books found"
                       books={found} title={"Search Results"} />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBar
