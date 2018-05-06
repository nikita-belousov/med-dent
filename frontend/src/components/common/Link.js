import React, { Component } from 'react'
import styles from '../../styles/components/common/Link.css'

const Link = (props) => {
  let linkStyle
  switch (props.type) {
    case 'alt':
      linkStyle = 'link--alt'
      break
    case 'dashed':
      linkStyle = 'dashed-link'
      break
    case 'dashed-alt':
    case 'alt-dashed':
      linkStyle = 'dashed-link--alt'
      break
    default:
      linkStyle = 'link'
  }

  return (
    <a
      className={props.isActive ? styles['active'] : styles[linkStyle]}
      href={props.href || '#'}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  )
}

export default Link
