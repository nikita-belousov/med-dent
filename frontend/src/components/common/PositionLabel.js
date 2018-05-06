import React from 'react'
import styles from '../../styles/components/common/PositionLabel.css'

const PositionLabel = ({ children }) => (
  <div className={styles['position-label']}>
    {children}
  </div>
)

export default PositionLabel
