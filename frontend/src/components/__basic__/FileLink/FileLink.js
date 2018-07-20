import React from 'react'
import FontAwesome from '@fortawesome/react-fontawesome'
import style from './FileLink.css'


export const FileLink = ({ file, title, size }) =>
  <div className={style.wrapper}>
    <div className={style.license}>
      <div className={style.icon}>
        <a href={file} title={title} target="_blank">
          <FontAwesome icon="file" />
        </a>
      </div>
      <div className={style.title}>
        <a href={file} title={title} target="_blank">
          {title}
        </a>
        <div className={style.size}>
          {size}
        </div>
      </div>
    </div>
  </div>
