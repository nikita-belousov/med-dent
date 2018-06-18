import React, { Component } from 'react'
import _ from 'lodash'
import FontAwesome from 'react-fontawesome'

import styles from './CountReview.css'
import { countCost as api } from '../../../agent'
import { AppearOnScrollReach } from '../../AppearOnScrollReach'
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
              <AppearOnScrollReach
                coefficient={0.7}
                offset={{ y: 50 }}
                duration={500}
              >
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
              </AppearOnScrollReach>
            </div>
            <div className={styles.rightCol}>
              <div className={styles.reviews}>
                <h3 className={styles.heading}>
                  О нас пишут
                </h3>
                <AppearOnScrollReach
                  coefficient={0.7}
                  offset={{ y: 30 }}
                  duration={500}
                  timeout={250}
                >
                  <ChangingReviews />
                </AppearOnScrollReach>
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
