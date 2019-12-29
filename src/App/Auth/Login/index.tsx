import React, { useState } from 'react'
import loader from './ripple.svg'
import { ReactComponent as LockIcon } from './locked.svg'
import { ReactComponent as KeyIcon } from './key.svg'
import { getLoginEndpoint } from './util'
import './Login.scss'

const LoginPrompt = ({ requestLogin }) => (
  <div className='login-prompt' onClick={requestLogin}>
    <LockIcon className='icon lock-icon' />
    <span className='text-container'>Login With Spotify</span>
    <KeyIcon className='icon key-icon' />
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
