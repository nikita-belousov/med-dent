import React, { Component } from 'react'
import styles from '../styles/components/Review.css'

import FeedbackResponse from './FeedbackResponse'
import Paragraph from './common/Paragraph'
import Link from './common/Link'
import StaticRating from './StaticRating'

class Review extends Component {
  render() {
    let {
      author,
      rating,
      createdAt,
      review,
      response
    } = this.props

    const date = new Date(createdAt)

    return (
      <div className={styles['wrapper']}>
        <div className={styles['top-row']}>
          <span className={styles['author']}>
            {author}
          </span>
          <span className={styles['date']}>
            {date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <div className={styles['rating']}>
            <StaticRating value={rating} />
          </div>
        </div>
        <FeedbackResponse
          hideResponse={true}
          feedback={review}
          response={response || null}
        />
      </div>
    )
  }
}

export default Review
