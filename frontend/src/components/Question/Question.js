import React from 'react'
import { FeedbackResponse }  from '../FeedbackResponse'
import style from './Question.css'


export const Question = ({ author, question, answer }) =>
  <div className={style['questionWrapper']}>
    <FeedbackResponse
      hideResponse={true}
      feedback={question}
      response={answer}
    />
  </div>
