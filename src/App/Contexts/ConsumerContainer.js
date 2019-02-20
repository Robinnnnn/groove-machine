import React from 'react'
import { UserConsumer, SpotifyConsumer } from './index'

export const ConsumerContainer = ({ child: CsComponent, ...rest }) =>
  <UserConsumer>
    {(user) => (
      <SpotifyConsumer>
        {(spotify) => (
          <CsComponent
            userState={user.state}
            userDispatch={user.dispatch}
            spotifyState={spotify.state}
            spotifyDispatch={spotify.dispatch}
            {...rest}
          />
        )}
      </SpotifyConsumer>
    )}
  </UserConsumer>
