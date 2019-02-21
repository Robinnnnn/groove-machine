import React from 'react'
import { Router } from '@reach/router'
import Login from './Login'
import Playlist from './Playlist'
import PrivateRoute from './PrivateRoute'

const Routes = () => (
  <Router>
    <Login path='login' default />
    <PrivateRoute as={Playlist} path='playlist/:id' />
  </Router>
)

export default Routes
