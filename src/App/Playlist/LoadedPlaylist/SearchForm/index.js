import React, { PureComponent, useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { navigate } from '@reach/router'
import { ReactComponent as SendIcon } from './send.svg'
import { ReactComponent as LoadingGif } from 'App/Auth/Login/ripple.svg'
import { validate } from './validate'
import './SearchForm.scss'

const SearchForm = ({ visible, setPlaylist }) => {
  const [highlighted, toggleHighlight] = useState(false)
  const [valid, toggleValid] = useState(false)
  const [loaded, toggleLoaded] = useState(true)

  const loadPlaylist = () => {
    if ((highlighted || visible) && valid) {
      toggleLoaded(false)
      setTimeout(async () => {
        await setPlaylist(valid)
        toggleLoaded(true)
      }, 1000)
    }
  }

  return (
    <div className='playlist-search-form'>
      <FinalForm
        onSubmit={loadPlaylist}
        validate={v => toggleValid(validate(v))}
        render={props => (
          <InputForm
            formProps={props}
            autocomplete={false}
            highlighted={highlighted}
            visible={visible}
            valid={valid}
            toggleHighlight={b => toggleHighlight(b)}
            loaded={loaded}
            loadPlaylist={loadPlaylist}
          />
        )}
      />
    </div>
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
      toggleHighlight,
      highlighted,
      visible,
      valid,
      loaded,
      loadPlaylist
    } = this.props

    const { handleSubmit, dirty } = formProps

    const labelClass = highlighted || visible ? 'focused' : ''
    const validClass = valid ? 'valid' : ''
    const invalidClass = !valid && dirty ? 'invalid' : ''

    return (
      <form className='search-form' onSubmit={handleSubmit}>
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
            {loaded ? (
              <SendIcon className='cta' />
            ) : (
              <LoadingGif className='loading' />
            )}
          </div>
        </div>

        <div
          className={`form-footer-container ${highlighted &&
            validClass} ${invalidClass}`}
          onClick={loadPlaylist}
        >
          <div className='footer-content'>
            {invalidClass ? "hmm, are you sure that's a real link?" : ''}
          </div>
        </div>
      </form>
    )
  }
}

export default SearchForm
