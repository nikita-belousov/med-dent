import React, { Component } from 'react'
import style from './ArticleThumbnail.css'


export const ArticleThumbnail = ({ src }) => (
  <div
    style={{ backgroundImage: src ? `url(${src})` : null }}
    className={style.thumbnail}
  />
)
