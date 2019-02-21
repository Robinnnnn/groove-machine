import React, { Component } from 'react'
import { navigate } from '@reach/router'
import querystring from 'query-string'
import {ConsumerContainer} from '../../Contexts'
import initSpotifyClient from '../spotify'
import './OAuth.scss'

const OAuthContainer = ({ location }) =>
  <ConsumerContainer child={OAuth} location={location} />

class OAuth extends Component {
  async componentDidMount() {
    const {
      location,
      userDispatch,
      spotifyDispatch
    } = this.props

    const tokens = querystring.parse(location.search)

    // TODO : This sequence of events is similar to the one in /PrivateRoute;
    // should bundle it up into one func and return an error if fail
    const spotify = initSpotifyClient(tokens)
    spotifyDispatch({
      type: 'initialize',
      payload: {
        spotify,
        ...tokens
      }
    })

    const user = await spotify.getMe()
    userDispatch({ type: 'login', payload: user })

    console.log('authed!', {spotify, user})
    const playlistId = '3a6kAci1fsVoCPJXltCvIv'
    console.log(`navigating to playlist ${playlistId} ...`)
    navigate(`/playlist/${playlistId}`)
  }

  render() {
    return (
      <div className='oauth-container'>
        {/* TODO: Loading Gif */}
      </div>
    )
  }
}

export default OAuthContainer
