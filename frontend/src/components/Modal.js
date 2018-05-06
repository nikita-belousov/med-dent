import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import FontAwesome from 'react-fontawesome'

import styles from './../styles/components/Modal.css'
import AppearAnimation from './AppearAnimation'
import ClosesOnExternalClick from './ClosesOnExternalClick'

class Modal extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  render() {
    const { heading, children, renderFooter, onClose } = this.props

    return (
        <div
          className={styles['shadow-bg']}
          style={{ top: window.scrollY }}
        >
          <AppearAnimation>
            <div className={styles['window']}>
              <ClosesOnExternalClick onClose={onClose}>
                <div>
                  <div className={styles['heading']}>
                    <div className={styles['inner']}>
                      <div
                        className={styles['closer']}
                        onClick={onClose}
                      >
                        <div className={styles['cross-icon']}>
                          <FontAwesome name='times' />
                        </div>
                      </div>
                      <h3 className={styles['heading-text']}>
                        {heading}
                      </h3>
                    </div>
                  </div>
                  <div className={styles['content']}>
                    <div className={styles['inner']}>
                      {children}
                    </div>
                  </div>
                  <div className={styles['footer']}></div>
                </div>
              </ClosesOnExternalClick>
            </div>
          </AppearAnimation>
        </div>
    )
  }
}

export default Modal
