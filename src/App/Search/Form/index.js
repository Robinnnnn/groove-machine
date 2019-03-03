import React, { useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import './Form.scss'

const validate = async values => {
  console.log('validating', values)
  return {}
}

const onSubmit = async values => {
  console.log('submitting', values)
}

const Form = () => {
  const [highlighted, toggleHighlight] = useState(false)

  const labelClass = highlighted ? 'focus' : ''

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, submitting, pristine }) => (
        <form className='search-form' onSubmit={handleSubmit}>
          <Field
            name='playlist'
            component='input'
            placeholder='Enter a link to a Spotify playlist'
            className='playlist-input'
            spellCheck={false}
            onFocus={() => toggleHighlight(!highlighted)}
            onBlur={() => toggleHighlight(!highlighted)}
          />
          <label className={`playlist-input-label ${labelClass}`} />

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
