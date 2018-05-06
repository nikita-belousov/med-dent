import React from 'react'
import styles from './../styles/components/PageCaption.css'

const PageCaption = (props) => (
  <h2 className={styles['page-caption']}>
    {props.children}
  </h2>
)

export default PageCaption
