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
      return this.kickBackToLogin()
    }

    console.log('loading tokens in private route', tokens)

    // TODO : This sequence of events is similar to the one in /OAuth;
    // should bundle it up into one func and return an error if fail
    const spotify = initSpotifyClient(tokens)
    spotifyDispatch({
      type: 'initialize',
      payload: spotify
    })

    const user = await spotify.getMe()
    userDispatch({ type: 'login', payload: user })

    console.log('authed from private route!', {spotify, user})
    this.setState({
      isAuthenticated: true,
      isAuthenticating: false
    })

    // TODO : Handle failure to authenticate and kick back to login screen
    // this.setState({
    //   isAuthenticated: false,
    //   isAuthenticating: false
    // })
  }

  kickBackToLogin = () => this.setState({
    isAuthenticating: false, isAuthenticated: false
  })

  render() {
    const { isAuthenticated, isAuthenticating } = this.state
    const { as: AuthComp, ...rest } = this.props
    if (isAuthenticating && !isAuthenticated) return <div>LOADINGGGGGGGG</div>
    if (!isAuthenticating && isAuthenticated) return <AuthComp {...rest} />
    if (!isAuthenticating && !isAuthenticated) return <Login />
  }
}

export default PrivateRouteContainer
