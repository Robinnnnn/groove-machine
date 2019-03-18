import React from 'react'
import { ReactComponent as SearchLogo } from './search.svg'
import './Search.scss'

const Search = ({ toggleSearch }) => (
  <div className='search-icon-container'>
    <SearchLogo className='search-icon' onClick={toggleSearch} />
  </div>
)

export default Search
