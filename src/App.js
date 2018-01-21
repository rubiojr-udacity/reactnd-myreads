import React from 'react'
import './App.css'
import BookList from './BookList'
import SearchBar from './SearchBar'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookList}/>
        <Route path="/search" component={SearchBar}/>
        <div className="open-search">
          <Link to="/search">>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
