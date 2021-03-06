import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

  state = {
    shelf: 'none'
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    shelf: PropTypes.string,
    authors: PropTypes.array,
    imageLinks: PropTypes.object.isRequired,
    bookShelfChanged: PropTypes.func.isRequired
  }

  handleShelfChange = (event) => {
    this.props.bookShelfChanged({id: this.props.id, shelf: event.target.value})
  }

  componentDidMount() {
    // FIXME: Extremely inefficient, one GET per book result returned
    BooksAPI.get(this.props.id).then(book => {
      this.setState({shelf: book.shelf})
    })
  }

  render() {
    return (<div className='book'>
      <div className='book-top'>
        <div className='book-cover' style={{
            width: 128,
            height: 192,
            backgroundImage: `url(${this.props.imageLinks.smallThumbnail})`
          }}></div>
        <div className='book-shelf-changer'>
          <select value={this.state.shelf} onChange={this.handleShelfChange}>
            <option value='none' disabled='disabled'>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{this.props.title}</div>
      <div className='book-authors'>{this.props.authors.join(', ')}</div>
    </div>)
  }
}

// Specifies the default values for props:
Book.defaultProps = {
  authors: [],
  description: '',
  shelf: 'none'
}

export default Book
