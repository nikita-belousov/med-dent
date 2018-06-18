import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './QuestionsPage.css'
import { Link } from '../../__basic__'
import { NarrowPage } from '../../__pages__'
import { AskQuestionPopup }  from '../../__overlay__'


export class QuestionsPage extends Component {
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
      <div className={style.questionPopup}>
        <AskQuestionPopup
          onClose={this.onPopupClose}
        />
      </div>
    )
  }

  render() {
    const { leaveQuestionPopup } = this.state

    return (
      <NarrowPage squeeze={true} heading='Ответы на вопросы'>
        <div className={style.askQuestion}>
          <div className={style.questionLinkWrapper}>
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
        <div className={style.questions}>
          {this.props.children}
        </div>
      </NarrowPage>
    )
  }
}
