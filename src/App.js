import React, { Component } from 'react';
import initSpotifyClient from './spotify';
import Routes from './routes'
import Login from './Login';
import Playlist from './Playlist';
import './App.css';

class App extends Component {
  state = {
    spotify: null,
    user: null,
    loginPrompt: false,
    lastReceivedTokenDate: 0
  }

  async componentDidMount() {
    const client = initSpotifyClient()
    if (!client) return this.setState({ loginPrompt: true })

    const { spotify, refreshToken } = client

    setInterval(() =>
      this.refreshTokenPeriodically(refreshToken, spotify)
    , 1000 * 60 * 10) // 10 minutes

    const user = await spotify.getMe()
    console.log({ user })

    this.setState({
      spotify,
      user,
      lastReceivedTokenDate: Date.now()
    })
  }
  
  refreshTokenPeriodically = (rToken, spotify) =>
    fetch(`/api/refresh_token?refresh_token=${rToken}`)
      .then(r => r.json())
      .then(({ access_token }) => spotify.setAccessToken(access_token))

  render() {
    const {
      spotify,
      loginPrompt
    } = this.state

    return (
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
    );
  }
}

export default App;
