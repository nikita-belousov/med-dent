import React, { Component } from 'react'
import styles from '../../styles/components/common/Button.css'
import LoadingAnimation from './../LoadingAnimation'

class Button extends Component {
  constructor(props) {
    super(props)

    this.base = 'button--' + (props.type || 'regular')
    this.classes = {
      normal: this.base,
      loading: this.base + '--loading',
      finished: this.base + '--finished',
      disabled: this.base + '--disabled'
    }
  }

  renderLoader() {
    return (
      <div className={styles['loader-wrapper']}>
        <LoadingAnimation />
      </div>
    )
  }

  render() {
    const {
      successText,
      children,
      type,
      width,
      getState,
      formSubmit,
      ...restProps
    } = this.props

    const state =  getState ? getState() : 'normal'

    return (
      <button
        className={styles[this.classes[state]]}
        style={{ width: this.props.width }}
        {...restProps}
      >
        {state === 'loading'
          ? this.renderLoader()
            : state === 'finished'
              ? successText
              : this.props.children}
      </button>
    )
  }
}

export default Button
