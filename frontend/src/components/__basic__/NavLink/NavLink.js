import React, { Component } from 'react'
import { matchPath, withRouter, NavLink as RouteLink } from 'react-router-dom'
import style from '../Link/Link.css'


let NavLink = ({ to, exact, history, children, activeClassName }) =>
  <RouteLink
    isActive={() => matchPath(history.location.pathname, { path: to, exact })}
    to={to}
    activeClassName={activeClassName || style.active}
  >
    {children}
  </RouteLink>


NavLink = withRouter(NavLink)

export { NavLink }
