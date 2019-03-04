import React, { Component } from 'react'
import { UserContext } from 'Contexts/index'
import Form from './Form'
import './Search.scss'

class Search extends Component {
  static contextType = UserContext

  state = { greeting: '' }

  componentDidMount() {
    const {
      state: {
        data: { display_name }
      }
    } = this.context
    const firstName = display_name && display_name.split(' ')[0]
    const greeting = firstName ? `Hi, ${firstName}!` : 'Hi!'
    this.setState({ greeting })
  }

  render() {
    const { greeting } = this.state
    return (
      <div className='search-page'>
        <div className='card-container'>
          <div className='greeting-container'>{greeting}</div>
          <Form />
        </div>
      </div>
    )
  }
}

export default Search
