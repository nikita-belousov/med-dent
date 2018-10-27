import _  from 'lodash'
import React, { Component } from 'react'
import validate from 'validate.js'
import FontAwesome from 'react-fontawesome'

import style from './CallbackPopup.css'
import { TextInput, Paragraph, Button } from '../../__basic__'
import { Form } from '../../__containers__'
import { Popup }  from '../index'


export class CallbackPopup extends Component {
  handleSubmit = () => {
    this.props.onSubmit()
    global.yaCounter50894339.reachGoal('CALLBACK')
  }

  render() {
    const constraints = {
      name: {
        presence: { allowEmpty: false },
      },
      phone: {
        presence: { allowEmpty: false, },
        format: /\+7 \(9\d{2}\) \d{3} \d{2} \d{2}/
      }
    }

    return (
      <div className={style.wrapper}>
        <Form
          withLoading
          submitOnEnter
          onSubmit={this.handleSubmit}
          loadingTime={2500}
          constraints={constraints}
        >
          <Popup {...this.props}>
            <div className={style.inner}>
              <TextInput
                alt
                label='Имя'
                name='name'
              />
              <TextInput
                alt
                label='Телефон'
                type='tel'
                name='phone'
                mask="+7 (999) 999 99 99"
                maskChar="_"
              />
              <div className={style.hint}>
                <Paragraph type='small'>
                  Администратор клиники свяжется с вами в течение пяти минут.
                </Paragraph>
              </div>
              <Button
                formSubmit
                type='popup'
                successText='Ждите звонка'
              >
                Перезвонить
              </Button>
            </div>
          </Popup>
        </Form>
      </div>
    )
  }
}
