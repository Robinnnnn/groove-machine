import React, { Component } from 'react'
import Login from '../Login'
import Loader from '../../Loader'
import getLoaderMessage from '../../Loader/sillyExcuses'
import { ConsumerContainer } from '../../Contexts'
import initSpotifyClient from '../spotify'

const PrivateRouteContainer = (props) =>
  <ConsumerContainer child={PrivateRoute} {...props} />

class PrivateRoute extends Component {
  state = {
    loaderMessage: '',
    isAuthenticated: false,
    isAuthenticating: true
  }

  componentWillMount() {
    this.setState({ loaderMessage: getLoaderMessage() })
  }

  async componentDidMount() {
    const {
      userDispatch,
      spotifyState,
      spotifyDispatch
    } = this.props

    // Start measuring loading time
    const start = Date.now()

    const tokens = {
      access_token: spotifyState.aToken,
      refresh_token: spotifyState.rToken
    }

    if (!tokens.access_token && !tokens.refresh_token) {
      return this.kickUser()
    }

    console.log('checking if the tokens need a refresh')
    this.handleTokenRefresh(spotifyState.lastTokenIssueTime)

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

    this.handleUninterruptedLoadingAnimation(start)
  }

  kickUser = () => {
    const { userDispatch, spotifyDispatch } = this.props
    userDispatch({ type: 'logout' })
    spotifyDispatch({ type: 'teardown' })
    this.setState({
      isAuthenticating: false, isAuthenticated: false
    })
  }

  handleTokenRefresh = tokenIssueTime => {
    const { spotifyDispatch } = this.props
    const now = Date.now()
    const tenMinutes = 1000 * 60 * 10
    const tokenIsOld = tokenIssueTime - now > tenMinutes
    if (tokenIsOld) spotifyDispatch({ type: 'refresh_token' })
  }

  /**
   * If the <AuthenticatedComponent /> itself has a loading phase, there may be
   * a visual jitter when rendering one <Loader /> after another. This method
   * ensures that the <Loader /> goes through at least one full animation cycle
   * prior to rendering the <AuthenticatedComponent />.
   */
  handleUninterruptedLoadingAnimation = (start) => {
    const loaderCycleMs = 1500
    const numCycles = 2
    const timePassed = Date.now() - start
    let timeUntilCycleEnd = (loaderCycleMs * numCycles) - timePassed
    // TODO : Handle multiple cycles if loader takes too long
    // if (timeUntilCycleEnd < 0) {
    //   timeUntilCycleEnd = ...
    // }

    setTimeout(() => {
      this.setState({
        isAuthenticated: true,
        isAuthenticating: false
      })
    }, timeUntilCycleEnd)
  }

  render() {
    const {
      loaderMessage,
      isAuthenticated,
      isAuthenticating
    } = this.state
    const { as: AuthenticatedComponent, ...rest } = this.props
    if (isAuthenticating && !isAuthenticated) return <Loader message={loaderMessage} />
    if (!isAuthenticating && isAuthenticated) return <AuthenticatedComponent {...rest} />
    if (!isAuthenticating && !isAuthenticated) return <Login />
  }
}

export default PrivateRouteContainer
