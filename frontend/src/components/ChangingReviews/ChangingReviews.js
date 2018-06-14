import React, { Component } from 'react'
import PropTypes from 'prop-types'
import truncate from 'lodash/truncate'
import { connect } from 'react-redux'

import { fetchReviewsSlides } from '../../actions'
import style from './ChangingReviews.css'
import { Link, Paragraph } from '../__basic__'
import { StaticRating }  from '../StaticRating'
import { ClosesOnExternalClick }  from '../ClosesOnExternalClick'


const mapStateToProps = state => ({ reviews: state.changingReviews.reviews })

const mapDispatchToProps = ({ fetchReviewsSlides })


let ChangingReviews = class extends Component {
  state = {
    current: 0,
    fullMode: false
  }

  static propTypes = {
    quantity: PropTypes.number,
    interval: PropTypes.number,
    maxLength: PropTypes.number
  }

  static defaultProps = {
    quantity: 8,
    interval: 10000,
    maxChars: 150
  }

  componentWillMount() {
    this.props.fetchReviewsSlides()
  }

  componentDidMount() {
    const { quantity, interval } = this.props

    this.interval = setInterval(() => {
      if (!this.state.fullMode) {
        this.setState(prev => ({
          ...prev,
          current: prev.current < quantity - 1
            ? prev.current + 1
            : 0
          }))
      }
    }, interval)
  }

  onFullClick = e => {
    e.preventDefault()

    this.setState(prev => ({
      ...prev,
      fullMode: true
    }))
  }

  onFullExit = () => {
    this.setState(prev => ({
      ...prev,
      fullMode: false
    }))
  }

  renderText(text) {
    const { maxChars } = this.props

    if (text.length > maxChars && !this.state.fullMode) {
      return (
        <div>
          <Paragraph>
            {truncate(text, { length: maxChars, separator: ' ' })}
          </Paragraph>

          <div className={style.moreLink}>
            <Link
              onClick={this.onFullClick}
              type='alt'
            >
              Читать полностью
            </Link>
          </div>
        </div>
      )
    } else return text
  }

  renderReview({ review, author, rating }) {
    return (
      <div>
        <div className={style.reviewBg}>
          {this.renderText(review)}
        </div>
        <div className={style.author}>
          <div className={style.name}>
            {author}
          </div>
          <div className={style.rating}>
            <StaticRating value={rating} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { reviews } = this.props
    const { fullMode, current } = this.state

    if (!reviews || reviews.length === 0) {
      return null
    }

    const wrapperClass = fullMode ? 'wrapper-full': 'wrapper'

    return (
      <div className={style[wrapperClass]}>
        {fullMode
          ? <ClosesOnExternalClick onClose={this.onFullExit}>
              {this.renderReview(reviews[current])}
            </ClosesOnExternalClick>
          : this.renderReview(reviews[current])}
      </div>
    )
  }
}

ChangingReviews = connect(mapStateToProps, mapDispatchToProps)(ChangingReviews)
export { ChangingReviews }
