import React, { Component } from 'react'
import { connect } from 'react-redux'
import validate from 'validate.js'
import FontAwesome from 'react-fontawesome'

import { questionSubmit } from '../../../actions'
import style from './AskQuestionPopup.css'
import { Form } from '../../__containers__'
import { Container, TextInput, Paragraph, Button, RatingInput } from '../../__basic__'
import { Popup } from '../index'


const mapDispatchToProps = { questionSubmit }


let AskQuestionPopup = ({ onClose, questionSubmit }) => {
  const constraints = {
    author: {
      presence: { allowEmpty: false }
    },
    question: {
      presence: { allowEmpty: false }
    }
  }

  return (
    <Container responsive={true}>
      <div className={style.wrapper}>
        <Popup onClose={onClose}>
          <Form
            withLoading
            loadingTime={2500}
            onSubmit={questionSubmit}
            constraints={constraints}
          >
            <div className={style.nameInput}>
              <TextInput
                alt
                label='Имя'
                name='author'
              />
            </div>
            <TextInput
              alt
              type='textarea'
              rows={4}
              label='Вопрос'
              name='question'
            />
            <div className={style.hint}>
              <Paragraph type='small' >
                Ответ на ваш вопрос будет опубликован в течение суток.
              </Paragraph>
            </div>
            <Button
              formSubmit
              type='popup'
              successText='Спасибо!'
            >
              Отправить
            </Button>
          </Form>
        </Popup>
      </div>
    </Container>
  )
}


AskQuestionPopup = connect(() => ({}), mapDispatchToProps)(AskQuestionPopup)

export { AskQuestionPopup }
