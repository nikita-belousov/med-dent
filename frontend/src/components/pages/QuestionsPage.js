import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/components/pages/QuestionsPage.css'

import Link from './../common/Link'
import NarrowPage from './NarrowPage'
import AskQuestionPopup from './../AskQuestionPopup'
import Pagination from './../common/Pagination'

class QuestionsPage extends Component {
  state = { leaveQuestionPopup: false }

  handleAskQuestionClick = (e) => {
    e.preventDefault()

    this.setState(prev => ({
      ...prev,
      leaveQuestionPopup: true
    }))
  }

  onPopupClose = () => {
    this.setState(prev => ({
      ...prev,
      leaveQuestionPopup: false
    }))
  }

  renderPopup() {
    return (
      <div className={styles['question-popup']}>
        <AskQuestionPopup
          onClose={this.onPopupClose}
        />
      </div>
    )
  }

  render() {
    const { leaveQuestionPopup } = this.state

    return (
      <NarrowPage heading='Часто задаваемые вопросы'>
        <div className={styles['ask-question']}>
          <div className={styles['question-link-wrapper']}>
            <Link
              type='dashed'
              onClick={this.handleAskQuestionClick}
              isActive={leaveQuestionPopup}
            >
              Задать вопрос
            </Link>
          </div>
          {leaveQuestionPopup && this.renderPopup()}
        </div>
        <div className={styles['questions']}>
          {this.props.children}
        </div>
      </NarrowPage>
    )
  }
}

export default QuestionsPage
