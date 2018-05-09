import React, { Component } from 'react'
import styles from '../../styles/components/common/TextInput.css'
import InputMask from 'react-input-mask'

class TextInput extends Component {
  state = { error: this.props.error }

  componentWillReceiveProps(nextProps) {
    this.setState(prev => ({
      error: nextProps.error
    }))
  }

  onInputFocus = () => {
    this.setState(prev => ({
      error: false
    }))
  }

  renderLabel() {
    const { alt, name, label } = this.props

    return (
      <label
        className={styles['label' + (alt ? '--alt' : '')]}
        htmlFor={name}
      >
        {label}
      </label>
    )
  }

  renderError() {
    return (
      <span className={styles['error-text']}>
        {this.props.error}
      </span>
    )
  }

  renderInput() {
    let { type, error, label, appearance, alt, ...restProps } = this.props
    if (!type) type = 'text'

    const classNames = {
      'text': 'text-field',
      'tel': 'text-field',
      'textarea': 'text-area'
    }

    const elem = type === 'textarea' ? 'textarea'
      : restProps.mask ? InputMask : 'input'

    let className = styles[classNames[type]]
    if (appearance)
      className += ' ' + styles[appearance]
    if (this.state.error)
      className += ' ' + styles['with-error']

    return (
      React.createElement(elem, {
        type,
        className,
        ...restProps
      })
    )
  }

  render() {
    return (
      <div>
        {this.props.label && this.renderLabel()}
        {this.renderInput()}
        {this.props.error && this.renderError()}
      </div>
    )
  }
}

export default TextInput
