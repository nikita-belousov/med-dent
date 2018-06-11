import React, { Component } from 'react'
import style from './Review.css'
import { FeedbackResponse }  from '../FeedbackResponse'
import { Paragraph, Link } from '../__basic__'
import { StaticRating }  from '../StaticRating'


export class Review extends Component {
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
      <div className={style.wrapper}>
        <div className={style.topRow}>
          <span className={style.author}>
            {author}
          </span>
          <span className={style.date}>
            {date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <div className={style.rating}>
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
