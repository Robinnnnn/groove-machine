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

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={v => toggleValid(validate(v))}
      render={props => (
        <InputForm
          formProps={props}
          toggleHighlight={() => toggleHighlight(!highlighted)}
          highlighted={highlighted}
          valid={valid}
        />
      )}
    />
  )
}

const InputForm = ({ formProps, toggleHighlight, highlighted, valid }) => {
  const { handleSubmit, submitting, dirty } = formProps

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
        onFocus={toggleHighlight}
        onBlur={toggleHighlight}
      />
      <label
        className={`playlist-input-label ${labelClass} ${validClass} ${invalidClass}`}
      />

      {
        // <div className='accepted-formats'>Accepted Formats</div>
        // <div>
        //   <button type='submit' disabled={submitting || !dirty}>
        //     Submit
        //   </button>
        // </div>
      }
    </form>
  )
}

export default Form
