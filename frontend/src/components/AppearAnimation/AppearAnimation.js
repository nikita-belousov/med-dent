import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import style from './AppearAnimation.css'


export const AppearAnimation = ({ children }) =>
  <ReactCSSTransitionGroup
    transitionAppearTimeout={0}
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}
    transitionAppear={true}
    transitionName={{
      appear: style.appear,
      appearActive: style.appearActive
    }}
  >
    {children}
  </ReactCSSTransitionGroup>
