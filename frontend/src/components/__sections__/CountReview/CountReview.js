import React, { Component } from 'react'
import _ from 'lodash'
import FontAwesome from 'react-fontawesome'

import styles from './CountReview.css'
import { countCost as api } from '../../../agent'
import { Form } from '../../__containers__'
import { Container, TextInput, Button } from '../../__basic__'
import { CallbackPopup }  from '../../__overlay__'
import { ChangingReviews }  from '../../ChangingReviews'


export class CountReview extends Component {
  state = { callbackForm: false }

  onCountFormSubmit = data => {
    this.problemValue = data.problem

    this.setState(prev => ({
      ...prev,
      callbackForm: true
    }))
  }

  handleBtnCLick = e => {
    e.nativeEvent.preventDefault()
    e.nativeEvent.stopImmediatePropagation()

    if (this.state.callbackForm)
      return

    this.setState(prevState => ({
      callbackForm: true
    }))
  }

  onCallbackClose = () => {
    this.setState(prev => ({
      ...prev,
      callbackForm: false
    }))
  }

  onCallbackSubmit = data => {
    CountCost({ ...data, problem: this.problemValue })
  }

  renderPopupForm() {
    return (
      <div className={styles.popupWrapper}>
        <CallbackPopup
          onClose={this.onCallbackClose}
          onSubmit={this.onCallbackSubmit}
        />
      </div>
    )
  }

  render() {
    const { callbackForm } = this.state
    const reviewsToShow = this.props.reviewsToShow || 10

    const constraints = {
      problem: {
        presence: { allowEmpty: false },
      }
    }

    return (
      <div className={styles.background}>
        <Container>
          <div className={styles.inner}>
            <div className={styles.leftCol}>
              <h3 className={styles.heading}>
                Узнать стоимость лечения
              </h3>
              <div className={styles.countPrice}>
                <div className={styles.countInner}>
                  <Form
                    onSubmit={this.onCountFormSubmit}
                    constraints={constraints}
                  >
                    <div className={styles.inputGroup}>
                      <div className={styles.problemInput}>
                        <TextInput
                          type='textarea'
                          name='problem'
                          label='Опишите вашу проблему'
                          rows='6'
                        />
                      </div>
                    </div>
                    <div  className={styles.countBtn}>
                      <Button formSubmit>
                        Рассчитать
                      </Button>
                    </div>
                  </Form>
                  {callbackForm && this.renderPopupForm()}
                </div>
              </div>
            </div>
            <div className={styles.rightCol}>
              <div className={styles.reviews}>
                <h3 className={styles.heading}>
                  О нас пишут
                </h3>
                <ChangingReviews />
              </div>
              <div className={styles.socials}>
                {/* <h3 className={styles.heading}>
                  Мы в соцсетях
                </h3> */}
                {/* <ul className={styles.socialIcons}>
                  <li>
                    <a href="#">
                      <FontAwesome size='2x' name='vk' />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FontAwesome size='2x' name='instagram' />
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
