import React, { Component } from 'react'
import classNames from 'classnames'
import style from './SpecialCard.css'
import { Paragraph, Link } from '../__basic__'


export class SpecialCard extends Component {
  render() {
    const { shortDescription, slug, image, color, title, small } = this.props
    const imagePath = require('../../assets/images/' + image)

    const wrapperClass = classNames({
      [style.wrapper]: true,
      [style.mobile]: small
    })

    const content = (
      <div className={style.content}>
        <div className={style.caption}>
          {title}
        </div>
        <div className={style.description}>
          <Paragraph>
            {shortDescription}
          </Paragraph>
        </div>
      </div>
    )

    return (
      <div className={wrapperClass}>
        <div className={style.card}>
          <Link href={`/specials/${slug}`}>
            <div
              className={style.background}
              style={{ backgroundImage: `url(${imagePath})` }}
            >
              {!small && content}
            </div>
          </Link>
        </div>

        {small &&
          <div className={style.mobileCaption}>
            <Link href={`/specials/${slug}`}>
              {title}
            </Link>
          </div>}
      </div>
    )
  }
}
