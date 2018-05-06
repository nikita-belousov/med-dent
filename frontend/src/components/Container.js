import React, { Component } from 'react'
import styles from './../styles/components/Container.css'

export default ({ children }) => (
  <div className={styles['container']}>
    {children}
  </div>
)
