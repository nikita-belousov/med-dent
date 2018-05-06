import _  from 'lodash'
import React, { Component } from 'react'
import validate from 'validate.js'
import styles from './../styles/components/CallbackPopup.css'

import FontAwesome from 'react-fontawesome'
import Form from './containers/Form'
import TextInput from './common/TextInput'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import Popup from './Popup'

class CallbackPopup extends Component {
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
      <div className={styles['wrapper']}>
        <Form
          withLoading
          onSubmit={this.props.onSubmit}
          loadingTime={2500}
          constraints={constraints}
        >
          <Popup {...this.props}>
            <div className={styles['inner']}>
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
              <div className={styles['hint']}>
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

export default CallbackPopup
