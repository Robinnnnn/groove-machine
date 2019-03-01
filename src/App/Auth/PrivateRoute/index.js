import React, { Component } from 'react'
import Login from '../Login'
import Loader from '../../Loader'
import getLoaderMessage from '../../Loader/sillyExcuses'
import { ConsumerContainer } from '../../Contexts'
import { initSpotifyClient, requestNewToken } from '../spotify'

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
      console.log('no tokens detected. get out!')
      return this.kickUser()
    }

    console.log('loading tokens in private route', tokens)

    const spotify = initSpotifyClient(tokens)
    spotifyDispatch({ type: 'initialize', payload: spotify })

    await this.handleTokenRefresh(spotify)

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
      isAuthenticating: false,
      isAuthenticated: false
    })
  }

  // Checks whether a token needs to be refreshed by comparing now to the last
  // issue time. Even though we already have a background `setInterval` running
  // to handle this, the request will never trigger if the user refreshes the
  // page at a faster interval.
  handleTokenRefresh = async (spotify) => {
    const {
      spotifyState: {
        rToken,
        lastTokenIssueTime
      },
      spotifyDispatch
    } = this.props
    const now = Date.now()
    const tenMinutes = 1000 * 60 * 10
    const tokenIsOld = now - lastTokenIssueTime > tenMinutes
    if (tokenIsOld) {
      console.log('token needs a refresh!')
      const newToken = await requestNewToken(rToken, spotify)
      spotifyDispatch({
        type: 'set_refreshed_token',
        payload: { aToken: newToken }
      })
    }
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
