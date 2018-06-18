import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ReviewsPage.css'
import { Link } from '../../__basic__'
import { NarrowPage } from '../index'
import { LeaveFeedbackPopup }  from '../../__overlay__'


export class ReviewsPage extends Component {
  state = { leaveFeedbackPopup: false }

  handleLeaveFeedbackClick = (e) => {
    e.preventDefault()

    this.setState(prev => ({
      ...prev,
      leaveFeedbackPopup: true
    }))
  }

  onPopupClose = () => {
    this.setState(prev => ({
      ...prev,
      leaveFeedbackPopup: false
    }))
  }

  renderPopup() {
    return (
      <div className={style.feedbackPopup}>
        <LeaveFeedbackPopup
          onClose={this.onPopupClose}
        />
      </div>
    )
  }

  render() {
    const { leaveFeedbackPopup } = this.state

    return (
      <NarrowPage squeeze={true} heading='Отзывы'>
        <div className={style.giveFeedback}>
          <div className={style.feedbackLinkWrapper}>
            <Link
              type='dashed'
              onClick={this.handleLeaveFeedbackClick}
              isActive={leaveFeedbackPopup}
            >
              Оставить отзыв
            </Link>
          </div>
          {leaveFeedbackPopup && this.renderPopup()}
        </div>
        <div className={style.reviews}>
          {this.props.children}
        </div>
      </NarrowPage>
    )
  }
}
