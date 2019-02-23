import React, { useState } from 'react'
import loader from './ripple.svg'
import './Login.scss'

const LoginPrompt = ({ requestLogin }) => (
  <div
    className='login-prompt'
    onClick={requestLogin}>
    <span
      className='lock-container'
      role='img'
      aria-label='lock'
    >🔒</span>
    <span
      className='text-container'
    >Login With Spotify</span>
    <span
      className='heart-container'
      role='img'
      aria-label='heart'
    >❤️</span>
  </div>
)

const Loader = () => (
  <img
    className='loader-gif'
    src={loader}
    alt='loader'
  />
)

const Login = () => {
  const [loading, toggleLoading] = useState(false)
  const requestLogin = () => {
    toggleLoading(!loading)
    setTimeout(() => window.location.href = '/api/login', 1500)
  }

  return (
    <div className='login-page'>
      <div className='login-prompt-container'>
        {
          !loading
            ? <LoginPrompt requestLogin={requestLogin} />
            : <Loader />
        }
      </div>
    </div>
  )
}

export default Login
