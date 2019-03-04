import React from 'react'
import { Router, Redirect } from '@reach/router'
import { Login, OAuth, PrivateRoute } from './Auth'
import Search from './Search'
import Playlist from './Playlist'

const Routes = () => (
  <Router>
    <Login path='login' />
    <OAuth path='oauth' />
    <PrivateRoute as={Search} path='search' />
    <PrivateRoute as={Playlist} path='playlist/:id' />
    <Redirect noThrow from='*' to='login' />
  </Router>
)

export default Routes
