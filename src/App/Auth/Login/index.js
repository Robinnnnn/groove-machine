import React from 'react'
import './Login.scss'

const Login = () => (
  <div className='login-prompt-container'>
    <a
      className='login-prompt'
      href='/api/login'
    >
      <span
        className='lock-container'
        role='img'
        aria-label='lock'
      >🔒</span>
      <span className='text-container'>Login With Spotify</span>
      <span
        className='heart-container'
        role='img'
        aria-label='heart'
      >❤️</span>
    </a>
  </div>
)

export default Login