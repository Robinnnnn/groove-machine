import React, { Component, useContext } from 'react'
import { navigate } from '@reach/router'
import querystring from 'query-string'
import { UserConsumer } from '../UserContext'
import { SpotifyConsumer } from '../SpotifyContext'
import initSpotifyClient from '../spotify'

const OAuthContainer = ({ location }) =>
  <UserConsumer>
    {({ dispatch: userDispatch }) => (
      <SpotifyConsumer>
        {({ dispatch: spotifyDispatch }) => (
          <OAuth
            location={location}
            userDispatch={userDispatch}
            spotifyDispatch={spotifyDispatch}
          />
        )}
      </SpotifyConsumer>
    )}
  </UserConsumer>


class OAuth extends Component {
  async componentDidMount() {
    const {
      location,
      userDispatch,
      spotifyDispatch
    } = this.props

    const query = querystring.parse(location.search)
    const spotify = initSpotifyClient(query)
    spotifyDispatch({ type: 'initialize', payload: spotify })

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
