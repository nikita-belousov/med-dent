import React from 'react'
import styles from './../styles/components/Section.css'

const Section = (props) => (
  <div className={styles['section-wrapper']}>
    {props.children}
  </div>
)

export default Section
