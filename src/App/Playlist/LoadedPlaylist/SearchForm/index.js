import React from 'react'
import SearchForm from 'Elements/SearchForm'
import './Form.scss'

const StyledForm = ({ visible }) => (
  <div className='playlist-search-form'>
    <SearchForm visible={visible} ctaPosition='right' />
  </div>
)

export default StyledForm
