import React, { Component } from 'react'
import style from './Container.css'


export const Container = ({ children }) => (
  <div className={style['container']}>
    {children}
  </div>
)
