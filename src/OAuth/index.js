import React, { Component, useContext } from 'react'
import querystring from 'query-string'
// import { UserContext } from '../UserContext'
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

    console.log('dispatched', {spotify, user})
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
