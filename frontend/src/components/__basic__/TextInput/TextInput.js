import React, { Component } from 'react'
import style from './TextInput.css'
import InputMask from 'react-input-mask'


export class TextInput extends Component {
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
        className={style['label' + (alt ? 'Alt' : '')]}
        htmlFor={name}
      >
        {label}
      </label>
    )
  }

  renderError() {
    return (
      <span className={style.errorText}>
        {this.props.error}
      </span>
    )
  }

  renderInput() {
    let { type, error, label, appearance, alt, ...restProps } = this.props
    if (!type) type = 'text'

    const classNames = {
      'text': 'textField',
      'tel': 'textField',
      'textarea': 'textArea'
    }

    const elem = type === 'textarea' ? 'textarea'
      : restProps.mask ? InputMask : 'input'

    let className = style[classNames[type]]
    if (appearance)
      className += ' ' + style[appearance]
    if (this.state.error)
      className += ' ' + style.withError

    return React.createElement(elem, { type, className, ...restProps })
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
