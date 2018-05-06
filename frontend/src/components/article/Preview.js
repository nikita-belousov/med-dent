import _ from 'lodash'
import utils from 'utils'
import React, { Component } from 'react'
import styles from './../../styles/components/article/Preview.css'
import { Link, Paragraph } from './../common'
import { PreviewPicture } from './'

const Preview = ({
  path,
  api,
  thumbnail,
  title,
  createdAt,
  text,
  truncate,
  slug
}) => {
  const thumb = thumbnail
    ? require('./../../assets/images/' + thumbnail)
    : undefined

  return (
    <div className={styles['article-entity']}>
      <div className={styles['columns']}>
        <div className={styles['side']}>
          <Link href={`/${path}/${slug}`}>
            <PreviewPicture src={thumb} />
          </Link>
        </div>
        <div className={styles['content']}>
          <div className={styles['caption']}>
            <div className={styles['headline-link']}>
              <Link href={`/${path}/${slug}`}>
                {title}
              </Link>
            </div>
            <div className={styles['date']}>
              {utils.formatDate(createdAt)}
            </div>
          </div>
          <Paragraph>
            {_.truncate(text, {
              length: truncate,
              separator: /,? +/
            })}
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

Preview.defaultProps = {
  truncate: 250
}

export default Preview
