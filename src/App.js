import React, { Component } from 'react';
import { UserProvider } from './UserContext'
import { SpotifyProvider } from './SpotifyContext'
import Routes from './routes'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <UserProvider>
          <SpotifyProvider>
            <Routes />
          </SpotifyProvider>
        </UserProvider>
      </div>
    );
  }
}

export default App;
