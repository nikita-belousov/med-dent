import React from 'react'
import styles from './Section.css'


export const Section = ({ children }) =>
  <div className={styles['sectionWrapper']}>
    {children}
  </div>
