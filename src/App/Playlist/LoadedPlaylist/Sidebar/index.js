import React from 'react'
import { navigate } from '@reach/router'
import './Sidebar.scss'

const Sidebar = () => {
  const loadSearch = () => navigate('/search')

  return (
    <div className='sidebar'>
      <p onClick={loadSearch}>SEARCH</p>
    </div>
  )
}

export default Sidebar
