import React, { Component } from 'react'
import Login from '../Login'
import { ConsumerContainer } from '../../Contexts'
import initSpotifyClient from '../spotify'

const PrivateRouteContainer = (props) =>
  <ConsumerContainer child={PrivateRoute} {...props} />

class PrivateRoute extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true
  }

  async componentDidMount() {
    const {
      userDispatch,
      spotifyState,
      spotifyDispatch
    } = this.props

    const tokens = {
      access_token: spotifyState.aToken,
      refresh_token: spotifyState.rToken
    }

    if (!tokens.access_token && !tokens.refresh_token) {
      return this.kickUser()
    }

    console.log('loading tokens in private route', tokens)

    const spotify = initSpotifyClient(tokens)
    spotifyDispatch({ type: 'initialize', payload: spotify })

    try {
      const user = await spotify.getMe()
      console.log('authed from private route!', { spotify, user })
      userDispatch({ type: 'login', payload: user })
    } catch(e) {
      console.log('Error retrieving user data', e.response)
      return this.kickUser()
    }

    this.setState({
      isAuthenticated: true,
      isAuthenticating: false
    })
  }

  kickUser = () => {
    const { userDispatch, spotifyDispatch } = this.props
    userDispatch({ type: 'logout' })
    spotifyDispatch({ type: 'teardown' })
    this.setState({
      isAuthenticating: false, isAuthenticated: false
    })
  }

  render() {
    const { isAuthenticated, isAuthenticating } = this.state
    const { as: AuthComp, ...rest } = this.props
    if (isAuthenticating && !isAuthenticated) return <div>LOADINGGGGGGGG</div>
    if (!isAuthenticating && isAuthenticated) return <AuthComp {...rest} />
    if (!isAuthenticating && !isAuthenticated) return <Login />
  }
}

export default PrivateRouteContainer
