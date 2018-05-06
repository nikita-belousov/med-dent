import React, { Component } from 'react'
import _ from 'lodash'
import styles from './../../styles/components/sections/CountReview.css'
import FontAwesome from 'react-fontawesome'

import Form from './../containers/Form'
import TextInput from './../common/TextInput'
import Button from './../common/Button'
import Container from './../Container'
import CallbackPopup from './../CallbackPopup'
import ChangingReviews from './../ChangingReviews'

class CountReview extends Component {
  state = {
    callbackForm: false
  }

  onCountFormSubmit = (data) => {
    this.problemValue = data.problem
    this.setState(prev => ({
      ...prev,
      callbackForm: true
    }))
  }

  handleBtnCLick = (e) => {
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

  onCallbackSubmit = (data) => {
    // emailjs.send(
    //   process.env.REACT_APP_MAIL_SERVICE,
    //   '_count_price',
    //   {
    //     problem: this.problemValue,
    //     name: _.capitalize(data.name),
    //     phone: data.phone
    //   }
    // )
    // .then(console.log)
    // .catch(console.log)
  }

  renderPopupForm() {
    return (
      <div className={styles['popup-wrapper']}>
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
      <div className={styles['background']}>
        <Container>
          <div className={styles['inner']}>
            <div className={styles['left-col']}>
              <h3 className={styles['heading']}>
                Узнать стоимость лечения
              </h3>
              <div className={styles['count-price']}>
                <div className={styles['count-inner']}>
                  <Form
                    onSubmit={this.onCountFormSubmit}
                    constraints={constraints}
                  >
                    <div className={styles['input-group']}>
                      <div className={styles['problem-input']}>
                        <TextInput
                          type='textarea'
                          name='problem'
                          label='Опишите вашу проблему'
                          rows='6'
                        />
                      </div>
                    </div>
                    <div  className={styles['count-btn']}>
                      <Button formSubmit>
                        Рассчитать
                      </Button>
                    </div>
                  </Form>
                  {callbackForm && this.renderPopupForm()}
                </div>
              </div>
            </div>
            <div className={styles['right-col']}>
              <div className={styles['reviews']}>
                <h3 className={styles['heading']}>
                  О нас пишут
                </h3>
                <ChangingReviews />
              </div>
              <div className={styles['socials']}>
                {/* <h3 className={styles['heading']}>
                  Мы в соцсетях
                </h3> */}
                {/* <ul className={styles['social-icons']}>
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

export default CountReview
