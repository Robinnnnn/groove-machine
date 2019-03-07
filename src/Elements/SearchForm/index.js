import React, { useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { navigate } from '@reach/router'
import { validate } from './validate'

const SearchForm = () => {
  const [highlighted, toggleHighlight] = useState(false)
  const [valid, toggleValid] = useState(false)

  const loadPlaylist = () =>
    highlighted && valid && navigate(`/playlist/${valid}`)

  return (
    <FinalForm
      onSubmit={loadPlaylist}
      validate={v => toggleValid(validate(v))}
      render={props => (
        <InputForm
          formProps={props}
          toggleHighlight={b => toggleHighlight(b)}
          highlighted={highlighted}
          valid={valid}
          loadPlaylist={loadPlaylist}
        />
      )}
    />
  )
}

const InputForm = ({
  formProps,
  toggleHighlight,
  highlighted,
  valid,
  loadPlaylist
}) => {
  const { handleSubmit, dirty } = formProps

  const labelClass = highlighted ? 'focused' : ''
  const validClass = valid ? 'valid' : ''
  const invalidClass = !valid && dirty ? 'invalid' : ''

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
        onClick={loadPlaylist}
      >
        <div className='footer-content'>
          {invalidClass ? "hmm, are you sure that's a real link?" : ''}
          {highlighted && valid ? 'Load Playlist' : ''}
        </div>
      </div>
    </form>
  )
}

export default SearchForm
