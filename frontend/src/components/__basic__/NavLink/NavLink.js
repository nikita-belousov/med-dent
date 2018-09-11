import React, { Component } from 'react'
import { matchPath, withRouter, NavLink as RouteLink } from 'react-router-dom'
import style from '../Link/Link.css'


let NavLink = ({
  onClick,
  inactive,
  to,
  exact,
  history,
  children,
  activeClassName,
  ...restProps
}) => {
  const restoreScroll = () => {
    window.document.documentElement.scrollTop = 0
  }

  return (
    <RouteLink
      onClick={() => {
        if (onClick) onClick()
        restoreScroll()
      }}
      isActive={inactive
        ? () => false
        : () => matchPath(history.location.pathname, { path: to, exact })}
      to={to}
      activeClassName={activeClassName || style.active}
    >
      {children}
    </RouteLink>
  )
}


NavLink = withRouter(NavLink)

export { NavLink }
