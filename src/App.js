import React, { Component } from 'react';
import { UserProvider } from './UserContext'
import { SpotifyProvider } from './SpotifyContext'
import Routes from './routes'
import './App.css'

class App extends Component {
  render() {
    return (
      <UserProvider>
        <SpotifyProvider>
          <div className='app'>
            <Routes />
          {
            // {loginPrompt && <Login />}
            // {spotify && <Playlist
            //   spotify={spotify}
            //   playlistId='3a6kAci1fsVoCPJXltCvIv'
            // />}
          }
          </div>
        </SpotifyProvider>
      </UserProvider>
    );
  }
}

export default App;
