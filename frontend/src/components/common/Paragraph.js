import React, { Component } from 'react'
import styles from '../../styles/components/common/Paragraph.css'

const Paragraph = (props) => {
  const style = props.type === 'small'
    ? 'paragraph--small'
    : 'paragraph'

  return (
    <p className={styles[style]}>
      {props.children}
    </p>
  )
}

export default Paragraph
