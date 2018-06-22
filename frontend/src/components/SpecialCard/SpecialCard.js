import React, { Component } from 'react'
import classNames from 'classnames'
import style from './SpecialCard.css'
import { Paragraph, Link } from '../__basic__'


export class SpecialCard extends Component {
  render() {
    const { shortDescription, slug, image, color, title, small } = this.props
    const imagePath = require('../../assets/images/' + image)

    const cardClass = classNames({
      [style.card]: !small,
      [style.cardMobile]: small
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
      <div className={cardClass}>
        <Link href={`/specials/${slug}`}>
          <div
            className={style.background}
            style={{ backgroundImage: `url(${imagePath})` }}
          >
            {!small && content}
          </div>
        </Link>

        {small && 
          <div className={style.caption}>
            {title}
          </div>}
      </div>
    )
  }
}
