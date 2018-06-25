import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { questionSubmit } from '../../../actions'
import style from './QuestionsPage.css'
import { Link } from '../../__basic__'
import { NarrowPage } from '../../__pages__'
import { AskQuestionPopup }  from '../../__overlay__'


const mapDispatchToProps = { questionSubmit }


let QuestionsPage = class extends Component {
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

  onFormSubmit = data => {
    this.props.questionSubmit(data)
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
          {leaveQuestionPopup &&
            <div className={style.questionPopup}>
              <AskQuestionPopup
                onFormSubmit={this.onFormSubmit}
                onClose={this.onPopupClose}
              />
            </div>}
        </div>
        <div className={style.questions}>
          {this.props.children}
        </div>
      </NarrowPage>
    )
  }
}


QuestionsPage = connect(() => ({}), mapDispatchToProps)(QuestionsPage)

export { QuestionsPage }
