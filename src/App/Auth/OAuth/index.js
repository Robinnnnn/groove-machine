import React, { Component } from 'react'
import { Redirect } from '@reach/router'
import querystring from 'query-string'
import { SpotifyContext } from 'Contexts/index'
import './OAuth.scss'

class OAuth extends Component {
  static contextType = SpotifyContext

  state = {
    redirectReady: false,
    playlistID: '',
    defaultPlaylistID: '37i9dQZF1DXcBWIGoYBM5M' // Today's Top Hits
    // '3a6kAci1fsVoCPJXltCvIv' // Valentine's playlist ID
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

    this.setState({
      redirectReady: true,
      playlistID: playlist_id
    })
  }

  render() {
    const { redirectReady, playlistID, defaultPlaylistID } = this.state
    if (!redirectReady) return null

    const defaultRedirect = `${defaultPlaylistID}?search=true`
    const redirect = `playlist/${playlistID || defaultRedirect}`
    return <Redirect to={redirect} noThrow />
  }
}

export default OAuth
