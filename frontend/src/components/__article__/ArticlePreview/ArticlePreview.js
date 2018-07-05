import _ from 'lodash'
import utils from 'utils'
import React, { Component } from 'react'
import style from './ArticlePreview.css'
import { Link, Paragraph } from '../../__basic__'
import { ArticleThumbnail } from '../index'


export const ArticlePreview = ({
  path,
  api,
  thumbnail,
  title,
  createdAt,
  text,
  truncate,
  slug,
  mediaQueries
}) => {
  const thumb = thumbnail
    ? require('../../../assets/images/' + thumbnail)
    : undefined

  return (
    <div className={style.articleEntity}>
      <div className={style.columns}>
        <div className={style.side}>
          <Link href={`/${path}/${slug}`}>
            <ArticleThumbnail src={thumb} />
          </Link>
        </div>
        <div className={style.content}>
          <div className={style.caption}>
            <div className={style.headlineLink}>
              <Link href={`/${path}/${slug}`}>
                {title}
              </Link>
            </div>
            <div className={style.date}>
              {utils.formatDate(createdAt)}
            </div>
          </div>
          <Paragraph>
            {_.truncate(text, { length: truncate, separator: /,? +/ })}
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

ArticlePreview.defaultProps = { truncate: 250 }
