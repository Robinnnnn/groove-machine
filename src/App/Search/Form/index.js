import React, { useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { validate } from './validate'
import './Form.scss'

const onSubmit = async values => {
  console.log('submitting', values)
}

const Form = () => {
  const [highlighted, toggleHighlight] = useState(false)
  const [valid, toggleValid] = useState(false)

  const labelClass = highlighted ? 'focused' : ''
  const validClass = valid ? 'valid' : ''

  console.log('valid status', valid)

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={v => {
        const isValid = validate(v)
        toggleValid(isValid)
        return isValid
      }}
      render={({ handleSubmit, submitting, pristine }) => (
        <form className='search-form' onSubmit={handleSubmit}>
          <Field
            name='playlist'
            component='input'
            placeholder='Paste a link to a Spotify playlist'
            className='playlist-input'
            spellCheck={false}
            onFocus={() => toggleHighlight(!highlighted)}
            onBlur={() => toggleHighlight(!highlighted)}
          />
          <label
            className={`playlist-input-label ${labelClass} ${validClass}`}
          />

          {
            // <div className='accepted-formats'>Accepted Formats</div>
            // <div>
            //   <button type='submit' disabled={submitting || pristine}>
            //     Submit
            //   </button>
            // </div>
          }
        </form>
      )}
    />
  )
}

export default Form
