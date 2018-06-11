import React from 'react'
import classNames from 'classnames'
import style from './Link.css'


export const Link = ({ children, type, isActive, href, onClick, target }) => {
  let cls = classNames({
    'linkAlt': type === 'alt',
    'linkDashed': type === 'dashed',
    'dashedLinkAlt': type === 'dashed-alt' || type === 'alt-dashed',
    'link': typeof type === 'undefined'
  })

  return (
    <a
      className={isActive ? style.active : style[cls]}
      href={href || '#'}
      onClick={onClick || null}
      target={target || '_self'}
    >
      {children}
    </a>
  )
}
