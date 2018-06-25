import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { reviewSubmit } from '../../../actions'
import style from './ReviewsPage.css'
import { Link } from '../../__basic__'
import { NarrowPage } from '../index'
import { LeaveFeedbackPopup }  from '../../__overlay__'


const mapDispatchToProps = { reviewSubmit }


let ReviewsPage = class extends Component {
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

  onFormSubmit = data => {
    this.props.reviewSubmit(data)
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
          {leaveFeedbackPopup &&
            <div className={style.feedbackPopup}>
              <LeaveFeedbackPopup
                onFormSubmit={this.onFormSubmit}
                onClose={this.onPopupClose}
              />
            </div>}
        </div>
        <div className={style.reviews}>
          {this.props.children}
        </div>
      </NarrowPage>
    )
  }
}


ReviewsPage = connect(() => ({}), mapDispatchToProps)(ReviewsPage)

export { ReviewsPage }
