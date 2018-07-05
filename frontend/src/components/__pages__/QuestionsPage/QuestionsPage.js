import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import style from './QuestionsPage.css'
import { Link } from '../../__basic__'
import { NarrowPage } from '../../__pages__'
import { AskQuestionPopup }  from '../../__overlay__'


const mapStateToProps = state => ({ mediaQueries: state.common.mediaQueries })


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

  render() {
    const { mediaQueries } = this.props
    const { leaveQuestionPopup } = this.state

    return (
      <NarrowPage squeeze={!mediaQueries.small} heading='Ответы на вопросы'>
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
              <AskQuestionPopup onClose={this.onPopupClose} />
            </div>}
        </div>
        <div className={style.questions}>
          {this.props.children}
        </div>
      </NarrowPage>
    )
  }
}


QuestionsPage = connect(mapStateToProps)(QuestionsPage)

export { QuestionsPage }
