import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import styles from './../styles/components/FeedbackResponse.css'
import Paragraph from './common/Paragraph'
import Link from './common/Link'

class FeedbackResponse extends Component {
  static propTypes = {
    previewLength: PropTypes.number,
    hideResponse: PropTypes.bool
  }

  static defaultProps = {
    previewLength: 350,
    hideResponse: false
  }

  constructor(props) {
    super(props)

    const { feedback, response, previewLength, hideResponse } = this.props
    const prepState = {}

    if (feedback.length > previewLength) {
      prepState.previewMode = true
      this.feedbackPreview = _.truncate(feedback, {
        length: previewLength,
        separator: ' '
      })
    }

    if (response && hideResponse) {
      prepState.showResponse = false
    }

    this.state = prepState
  }

  toggleResponse = e => {
    e.preventDefault()

    this.setState(prev => ({
      ...prev,
      showResponse: !prev.showResponse
    }))
  }

  toggleFeedback = e => {
    e.preventDefault()

    this.setState(prev => ({
      ...prev,
      previewMode: !prev.previewMode
    }))
  }

  renderPreview() {
    return (
      <div>
        <Paragraph>
          {this.feedbackPreview}
        </Paragraph>
        <Link onClick={this.onReadFurtherClick}>
          Читать далее
        </Link>
      </div>
    )
  }

  render() {
    const { previewMode, showResponse, } = this.state
    const { feedback, response } = this.props

    return (
      <div>
        <div className={styles['feedback']}>
          <Paragraph>
            {previewMode ? this.feedbackPreview : feedback}
          </Paragraph>
          {this.feedbackPreview &&
            <div className={styles['toggle-feedback']}>
              <Link onClick={this.toggleFeedback}>
                {previewMode ? 'Развернуть' : 'Свернуть'}
              </Link>
            </div>}
        </div>
        {response &&
          <div
            className={showResponse ? styles['response--shown'] : styles['response']}
            onClick={showResponse ? null : this.toggleResponse}
          >
            <div className={styles['toggle-response']}>
              <Link
                type='alt'
                onClick={showResponse ? this.toggleResponse : null}
              >
                {showResponse ? 'Скрыть' : 'Показать'} ответ
              </Link>
            </div>
            {showResponse &&
              <Paragraph>
                {response}
              </Paragraph>}
          </div>}
      </div>
    )
  }
}

export default FeedbackResponse
