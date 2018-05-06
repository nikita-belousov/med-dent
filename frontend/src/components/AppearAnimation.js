import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './../styles/components/AppearAnimation.css'

export default ({ children }) =>
  <ReactCSSTransitionGroup
    transitionAppearTimeout={0}
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}
    transitionAppear={true}
    transitionName={{
      appear: styles['appear'],
      appearActive: styles['appear-active']
    }}
  >
    {children}
  </ReactCSSTransitionGroup>
