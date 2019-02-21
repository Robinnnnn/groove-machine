import React from 'react'
import { Router } from '@reach/router'
import { Login, OAuth, PrivateRoute } from './Auth'
import Playlist from './Playlist'

const Routes = () => (
  <Router>
    <Login path='login' default />
    <OAuth path='oauth' />
    <PrivateRoute as={Playlist} path='playlist/:id' />
  </Router>
)

export default Routes
