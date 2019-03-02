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

    const query = querystring.parse(location.search)
    const { access_token, refresh_token, playlist_id } = query

    // Set tokens in the Spotify context for the PrivateRoute
    // to use for authorization
    dispatch({
      type: 'set_tokens',
      payload: {
        aToken: access_token,
        rToken: refresh_token
      }
    })

    // let valentinesPlaylistId = '3a6kAci1fsVoCPJXltCvIv'

    this.setState({
      redirectReady: true,
      playlistId: playlist_id
    })
  }

  render() {
    const { redirectReady, playlistId } = this.state
    if (!redirectReady) return null
    console.log(`navigating to playlist ${playlistId} ...`)
    return <Redirect to={`playlist/${playlistId}`} noThrow />
  }
}

export default OAuth
