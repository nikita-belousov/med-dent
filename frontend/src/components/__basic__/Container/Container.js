import React, { Component } from 'react'
import classNames from 'classnames'
import style from './Container.css'


export const Container = ({ children, responsive }) => {
  const className = classNames({
    [style.container]: true,
    [style.responsive]: responsive,
    [style.mobile]: true
  })

  return (
    <div className={className}>
      {children}
    </div>
  )
}
