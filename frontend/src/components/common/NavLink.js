import React from 'react'
import { NavLink as RouteLink } from 'react-router-dom'
import styles from './../../styles/components/common/Link.css'

const NavLink = ({ to, children }) => (
  <RouteLink
    to={to}
    activeClassName={styles['active']}
  >
    {children}
  </RouteLink>
)

export default NavLink
