import React from 'react'
import { NavLink as RouteLink } from 'react-router-dom'
import style from '../Link/Link.css'


// TODO: использовать компонент Link внутри
export const NavLink = ({ to, children }) => (
  <RouteLink
    to={to}
    activeClassName={style.active}
  >
    {children}
  </RouteLink>
)
