import React, { Component } from 'react'
import classNames from 'classnames'
import styles from '../../styles/components/common/Link.css'

const Link = ({
  children,
  type,
  isActive,
  href,
  onClick,
  target
}) => {
  let cls = classNames({
    'link--alt': type === 'alt',
    'link-dashed': type === 'dashed',
    'dashed-link--alt': type === 'dashed-alt' || type === 'alt-dashed',
    'link': typeof type === 'undefined'
  })

  return (
    <a
      className={isActive ? styles['active'] : styles[cls]}
      href={href || '#'}
      onClick={onClick || null}
      target={target || '_self'}
    >
      {children}
    </a>
  )
}

export default Link
