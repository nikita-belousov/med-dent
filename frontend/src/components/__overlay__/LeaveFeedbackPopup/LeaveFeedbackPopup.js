import React, { Component } from 'react'
import validate from 'validate.js'
import FontAwesome from 'react-fontawesome'

import { feedbackSubmit } from '../../../actions'
import style from './LeaveFeedbackPopup.css'
import { Container, TextInput, Paragraph, Button, RatingInput } from '../../__basic__'
import { Form } from '../../__containers__'
import { Popup }  from '../index'


export class LeaveFeedbackPopup extends Component {
  render() {
    const constraints = {
      author: {
        presence: { allowEmpty: false }
      },
      rating: {
        presence: { allowEmpty: false }
      },
      review: {
        presence: { allowEmpty: false },
      }
    }

    return (
      <Container responsive={true}>
        <div className={style.wrapper}>
          <Popup {...this.props}>
            <Form
              withLoading
              loadingTime={2500}
              onSubmit={this.props.onFormSubmit}
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
                label='Отзыв'
                name='review'
              />
              <div className={style.ratingInput}>
                <RatingInput
                  name='rating'
                  label='Ваша оценка'
                />
              </div>
              <div className={style.hint}>
                <Paragraph type='small' >
                  Ваш отзыв будет опубликован в течение суток.
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
}
