import React from 'react'
import style from './PageCaption.css'


export const PageCaption = ({ children }) =>
  <h2 className={style.pageCaption}>
    {children}
  </h2>
