import React, { Component } from 'react'
import style from './Paragraph.css'

export const Paragraph = (props) => {
  const style = props.type === 'small'
    ? 'paragraph--small'
    : 'paragraph'

  return (
    <p className={style[style]}>
      {props.children}
    </p>
  )
}
