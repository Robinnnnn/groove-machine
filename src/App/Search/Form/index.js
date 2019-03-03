import React, { useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { navigate } from '@reach/router'
import { validate } from './validate'
import './Form.scss'

const onSubmit = async values => {
  console.log('submitting', values)
}

const Form = () => {
  const [highlighted, toggleHighlight] = useState(false)
  const [valid, toggleValid] = useState(false)

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={v => toggleValid(validate(v))}
      render={props => (
        <InputForm
          formProps={props}
          toggleHighlight={b => toggleHighlight(b)}
          highlighted={highlighted}
          valid={valid}
        />
      )}
    />
  )
}

const InputForm = ({ formProps, toggleHighlight, highlighted, valid }) => {
  const { handleSubmit, dirty } = formProps

  const labelClass = highlighted ? 'focused' : ''
  const validClass = valid ? 'valid' : ''
  const invalidClass = !valid && dirty ? 'invalid' : ''

  const loadPlaylist = () => navigate(`/playlist/${valid}`)

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <Field
        name='playlist'
        component='input'
        placeholder='Paste a link to a Spotify playlist'
        className='playlist-input'
        spellCheck={false}
        onFocus={() => toggleHighlight(true)}
        onBlur={() => !valid && toggleHighlight(false)}
      />
      <label
        className={`playlist-input-label ${labelClass} ${validClass} ${invalidClass}`}
      />

      <div
        className={`form-footer-container ${highlighted &&
          validClass} ${invalidClass}`}
      >
        <div className='footer-content'>
          {invalidClass ? "hmm, are you sure that's a real link?" : ''}
          {highlighted && valid ? (
            <p onClick={loadPlaylist}>Load Playlist</p>
          ) : (
            ''
          )}
        </div>
      </div>
    </form>
  )
}

export default Form
