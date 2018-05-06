import path from 'path'
import React, { Component } from 'react'
import styles from './../../styles/components/SpecialCard.css'
import { Paragraph, Link } from './../common'

class SpecialCard extends Component {
  render() {
    const { shortDecription, slug, image, color, title } = this.props

    const isBig = false
    const imageUrl = require('./../../assets/images/' + image)
    const bgStyle = {
      backgroundImage: isBig
        ? `linear-gradient(to left, transparent 0%, ${color} 60%, ${color} 100%), url(${imageUrl})`
        : `linear-gradient(to bottom, transparent 0%, ${color} 60%, ${color} 100%), url(${imageUrl})`
    }

    return (
      <div className={styles['wrapper']}>
        <Link href={`/specials/${slug}`}>
          <div
            className={isBig ? styles['card--big'] : styles['card']}
            style={bgStyle}
          >
            <div className={styles['inner']}>
              <div className={styles['caption']}>
                {title}
              </div>
              <div className={styles['description']}>
                <Paragraph type='small'>
                  {shortDecription}
                </Paragraph>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default SpecialCard
