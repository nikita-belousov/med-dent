import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './../styles/components/Popup.css'
import AppearAnimation from './AppearAnimation'
import LoadingAnimation from './LoadingAnimation'
import ClosesOnExternalClick from './ClosesOnExternalClick'
import Button from './common/Button'
import Paragraph from './common/Paragraph'

class Popup extends Component {
  renderLoader() {
    return (
      <div className={styles['loader-wrapper']}>
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
            className={styles['popup']}
            ref={node => this.node = node}
          >
            <div className={styles['inner']}>
              {this.props.children}
            </div>
          </div>
        </AppearAnimation>
      </ClosesOnExternalClick>
    )
  }
}

export default Popup
