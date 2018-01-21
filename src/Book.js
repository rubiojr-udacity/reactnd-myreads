import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    imageLinks: PropTypes.object.isRequired,
    bookShelfChanged: PropTypes.func.isRequired
  }

  handleShelfChange = (event) => {
    this.props.bookShelfChanged({ id: this.props.id, shelf: event.target.value })
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${this.props.imageLinks.smallThumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.shelf} onChange={this.handleShelfChange}>
      	<option value="none" disabled>Move to...</option>
      	<option value="currentlyReading">Currently Reading</option>
      	<option value="wantToRead">Want to Read</option>
      	<option value="read">Read</option>
      	<option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join(', ')}</div>
      </div>
    )
  }
}

export default Book
