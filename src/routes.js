import React from 'react'
import { Router } from '@reach/router'
import Login from './Login'
import OAuth from './OAuth'
import Playlist from './Playlist'
import PrivateRoute from './PrivateRoute'

const Routes = () => (
  <Router>
    <Login path='login' default />
    <OAuth path='oauth' />
    <PrivateRoute as={Playlist} path='playlist/:id' />
  </Router>
)

export default Routes
