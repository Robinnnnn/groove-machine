import React, { useState } from 'react'
import loader from './ripple.svg'
import './Login.scss'
import { getLoginEndpoint } from './util'

const LoginPrompt = ({ requestLogin }) => (
  <div className='login-prompt' onClick={requestLogin}>
    <span className='lock-container' role='img' aria-label='lock'>
      🔒
    </span>
    <span className='text-container'>Login With Spotify</span>
    <span className='heart-container' role='img' aria-label='heart'>
      ❤️
    </span>
  </div>
)

const Loader = () => <img className='loader-gif' src={loader} alt='loader' />

const Login = ({ location }) => {
  const [loading, toggleLoading] = useState(false)

  const requestLogin = () => {
    toggleLoading(!loading)
    const endpoint = getLoginEndpoint(location.pathname)
    setTimeout(() => (window.location.href = endpoint), 1000)
  }

  return (
    <div className='login-page'>
      <div className='login-prompt-container'>
        {!loading ? <LoginPrompt requestLogin={requestLogin} /> : <Loader />}
      </div>
    </div>
  )
}

export default Login
