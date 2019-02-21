import React, { Component } from 'react'
import { Redirect } from '@reach/router'
import querystring from 'query-string'
import { SpotifyContext } from '../../Contexts'
import './OAuth.scss'

class OAuth extends Component {
  static contextType = SpotifyContext

  state = {
    redirectReady: false,
    playlistId: ''
  }

  componentDidMount() {
    const { location } = this.props
    const { dispatch } = this.context

    const tokens = querystring.parse(location.search)

    // Set tokens in the Spotify context for the PrivateRoute
    // to use for authorization
    dispatch({
      type: 'setTokens',
      payload: {
        aToken: tokens.access_token,
        rToken: tokens.refresh_token
      }
    })

    this.setState({
      redirectReady: true,
      playlistId: '3a6kAci1fsVoCPJXltCvIv'
    })
  }

  render() {
    const {
      redirectReady,
      playlistId
    } = this.state

    if (redirectReady) {
      console.log(`navigating to playlist ${playlistId} ...`)
      return <Redirect to={`playlist/${playlistId}`} noThrow />
    }

    return (
      <div className='oauth-container'>
        {/* TODO: Loading Gif */}
      </div>
    )
  }
}

export default OAuth
