import React, { PureComponent, useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { navigate } from '@reach/router'
import { ReactComponent as SendLogo } from './send.svg'
import { validate } from './validate'

const SearchForm = ({ visible, ctaPosition }) => {
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
          autocomplete={false}
          visible={visible}
          ctaPosition={ctaPosition}
          highlighted={highlighted}
          valid={valid}
          toggleHighlight={b => toggleHighlight(b)}
          loadPlaylist={loadPlaylist}
        />
      )}
    />
  )
}

class InputForm extends PureComponent {
  componentDidUpdate(prevProps) {
    // Autofocus if search bar is being opened
    if (!prevProps.visible && this.props.visible) {
      this.textInput.focus()
    }
  }

  render() {
    const {
      formProps,
      visible,
      ctaPosition,
      toggleHighlight,
      highlighted,
      valid,
      loadPlaylist
    } = this.props

    const { handleSubmit, dirty } = formProps

    const labelClass = highlighted || visible ? 'focused' : ''
    const validClass = valid ? 'valid' : ''
    const invalidClass = !valid && dirty ? 'invalid' : ''
    const positionClass = `cta-position-${ctaPosition}`

    return (
      <form className={`search-form ${positionClass}`} onSubmit={handleSubmit}>
        <div className='search-bar-container'>
          <div className='input-container'>
            <Field
              name='playlist'
              render={({ input }) => (
                <>
                  <input
                    ref={i => (this.textInput = i)}
                    type='text'
                    className='playlist-input'
                    placeholder='Paste a link to a Spotify playlist'
                    spellCheck={false}
                    onFocus={() => toggleHighlight(true)}
                    onBlur={() => !valid && toggleHighlight(false)}
                    {...input}
                  />
                  <label
                    className={`playlist-input-label ${labelClass} ${validClass} ${invalidClass}`}
                  />
                </>
              )}
            />
          </div>
          <div className={`cta-container ${validClass}`} onClick={loadPlaylist}>
            <SendLogo className='cta' />
          </div>
        </div>

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
}

export default SearchForm
