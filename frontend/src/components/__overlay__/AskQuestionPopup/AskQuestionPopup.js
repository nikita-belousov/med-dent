import React, { Component } from 'react'
import validate from 'validate.js'
import FontAwesome from 'react-fontawesome'

import { Questions as api } from '../../../agent'
import style from './AskQuestionPopup.css'
import { Form } from '../../__containers__'
import { TextInput, Paragraph, Button, RatingInput } from '../../__basic__'
import { Popup } from '../index'


export class AskQuestionPopup extends Component {
  onSubmit = data => {
    api.post(data)
  }

  render() {
    const constraints = {
      author: {
        presence: { allowEmpty: false }
      },
      question: {
        presence: { allowEmpty: false }
      }
    }

    return (
      <div className={style.wrapper}>
        <Popup {...this.props}>
          <Form
            withLoading
            loadingTime={2500}
            onSubmit={this.onSubmit}
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
    )
  }
}
