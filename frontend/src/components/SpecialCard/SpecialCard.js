import React, { Component } from 'react'
import styles from './SpecialCard.css'
import { Paragraph, Link } from '../__basic__'


export class SpecialCard extends Component {
  render() {
    const { shortDescription, slug, image, color, title } = this.props
    const imagePath = require('../../assets/images/' + image)

    return (
      <div className={styles.wrapper}>
        <Link href={`/specials/${slug}`}>
          <div
            className={styles.card}
            style={{ backgroundImage: `url(${imagePath})` }}
          >
            <div className={styles.inner}>
              <div className={styles.caption}>
                {title}
              </div>
              <div className={styles.description}>
                <Paragraph>
                  {shortDescription}
                </Paragraph>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}
