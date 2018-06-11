import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import style from './LoadingAnimation.css'


export const LoadingAnimation = () =>
  <div className={style.wrapper}>
    <CircularProgress
      color='#fff'
      size={40}
      thickness={7}
    />
  </div>
