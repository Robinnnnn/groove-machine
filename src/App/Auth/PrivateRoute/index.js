import React, { useContext } from 'react'
import Login from '../Login'
import { UserContext } from '../../Contexts'

const PrivateRoute = ({ as: AuthComp, ...rest }) => {
  const { state: user } = useContext(UserContext)
  return user.authenticated ? <AuthComp {...rest} /> : <Login />
}

export default PrivateRoute
