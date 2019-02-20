import React from 'react'
import { Router } from '@reach/router'
import Login from './Login'
import Playlist from './Playlist'

const Routes = () => (
  <Router>
    <Login path='login' default />
    <Playlist path='playlist/:id' />
  </Router>
)

export default Routes
