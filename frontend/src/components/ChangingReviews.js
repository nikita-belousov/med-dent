import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import styles from './../styles/components/ChangingReviews.css'

import Paragraph from './common/Paragraph'
import Link from './common/Link'
import StaticRating from './StaticRating'
import ClosesOnExternalClick from './ClosesOnExternalClick'

import { Reviews as api } from './../agent'

import {
  CHANGING_REVIEWS_LOADED,
  CHANGING_REVIEWS_UNLOADED
} from './../constants/actionTypes'

const mapStateToProps = state => ({
  reviews: state.changingReviews.reviews
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: CHANGING_REVIEWS_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: CHANGING_REVIEWS_UNLOADED })
})

class ChangingReviews extends Component {
  state = {
    current: 0,
    fullMode: false
  }

  static propTypes = {
    onLoad: PropTypes.func.isRequired,
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
    const { onLoad, quantity } = this.props
    onLoad(api.page(quantity, 1))
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

  componentWillUnmount() {
    this.props.onUnload()
    clearInterval(this.interval)
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

    const words = _.words(text)

    if (words.length > maxChars && !this.state.fullMode) {
      return (
        <div>
          <Paragraph>
            {_.trucate(words, {
              length: maxChars,
              separator: ' '
            })}
          </Paragraph>
          <div className={styles['more-link']}>
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
        <div className={styles['review-bg']}>
          {this.renderText(review)}
        </div>
        <div className={styles['author']}>
          <div className={styles['name']}>
            {author}
          </div>
          <div className={styles['rating']}>
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
      <div className={styles[wrapperClass]}>
        {fullMode
          ? <ClosesOnExternalClick onClose={this.onFullExit}>
              {this.renderReview(reviews[current])}
            </ClosesOnExternalClick>
          : this.renderReview(reviews[current])}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangingReviews)
