import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './Popup.css'
import { LoadingAnimation, Button, Paragraph }  from '../../__basic__'
import { AppearAnimation } from '../../AppearAnimation'
import { ClosesOnExternalClick }  from '../../ClosesOnExternalClick'


export class Popup extends Component {
  renderLoader() {
    return (
      <div className={style.loaderWrapper}>
        <LoadingAnimation />
      </div>
    )
  }

  render() {
    const { onClose } = this.props

    return (
      <ClosesOnExternalClick onClose={onClose}>
        <AppearAnimation>
          <div
            className={style.popup}
            ref={node => this.node = node}
          >
            <div className={style.inner}>
              {this.props.children}
            </div>
          </div>
        </AppearAnimation>
      </ClosesOnExternalClick>
    )
  }
}
