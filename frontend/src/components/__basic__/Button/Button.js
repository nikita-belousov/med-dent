import React, { Component } from 'react'
import capitalize from 'lodash/capitalize'
import style from './Button.css'
import { LoadingAnimation }  from '../index'


export class Button extends Component {
  constructor(props) {
    super(props)

    this.base = 'button' + (capitalize(props.type) || 'Regular')

    this.classes = {
      normal: this.base,
      loading: this.base + 'Loading',
      finished: this.base + 'Finished',
      disabled: this.base + 'Disabled'
    }
  }

  renderLoader() {
    return (
      <div className={style.loaderWrapper}>
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
        className={style[this.classes[state]]}
        style={{ width: this.props.width }}
        {...restProps}
      >
        {state === 'Loading'
          ? this.renderLoader()
            : state === 'Finished'
              ? successText
              : this.props.children}
      </button>
    )
  }
}
