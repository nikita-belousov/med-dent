import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import styles from '../styles/components/LoadingAnimation.css'

const LoadingAnimation = (props) => (
  <div className={styles['wrapper']}>
    <CircularProgress
      color='#fff'
      size={40}
      thickness={7}
    />
  </div>
)

export default LoadingAnimation
