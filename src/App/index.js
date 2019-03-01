import React from 'react'
import { UserProvider, SpotifyProvider } from './Contexts'
import Routes from './routes'
import './App.scss'

const App = () => (
  <div className='app'>
    <UserProvider>
      <SpotifyProvider>
        <Routes />
      </SpotifyProvider>
    </UserProvider>
  </div>
)

export default App
