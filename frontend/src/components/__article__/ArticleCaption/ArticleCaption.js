import React from 'react'
import utils from 'utils'
import FontAwesome from 'react-fontawesome'
import style from './ArticleCaption.css'


export const ArticleCaption = ({ createdAt, views }) =>
  <div className={style.wrapper}>
    <div className={style.date}>
      {utils.formatDate(createdAt)}
    </div>
    <div className={style.views}>
      <span className={style.eyeIcon}>
        <FontAwesome name='eye' />
      </span>
      {views}
    </div>
  </div>
