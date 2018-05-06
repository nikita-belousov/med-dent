import React from 'react'
import { NavLink as RouteLink } from 'react-router-dom'
import styles from './../../styles/components/common/Link.css'

const NavLink = (props) => (
  <RouteLink
    to={props.to}
    activeClassName={styles['active']}
  >
    {props.children}
  </RouteLink>
)

export default NavLink
