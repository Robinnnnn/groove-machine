import React from 'react'
import { navigate } from '@reach/router'
import { ReactComponent as SearchLogo } from './search.svg'
import './Sidebar.scss'

const Sidebar = () => {
  const loadSearch = () => navigate('/search')

  return (
    <div className='sidebar'>
      <SearchLogo className='search-icon' onClick={loadSearch} />
    </div>
  )
}

export default Sidebar
