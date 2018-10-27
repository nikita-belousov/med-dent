import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import _ from 'lodash'
import FontAwesome from 'react-fontawesome'

import { countCost } from '../../../actions'
import style from './CountReview.css'
import { AppearOnScrollReach } from '../../AppearOnScrollReach'
import { Form } from '../../__containers__'
import { Container, TextInput, Button } from '../../__basic__'
import { CallbackPopup }  from '../../__overlay__'
import { ChangingReviews }  from '../../ChangingReviews'


const mapStateToProps = state => ({ mediaQueries: state.common.mediaQueries })

const mapDispatchToProps = { countCost }


let CountReview = class extends Component {
  static defaultProps = { reviewsToShow: 10 }

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
    this.props.countCost({
      ...data,
      problem: this.problemValue
    })

    global.yaCounter50894339.reachGoal('COUNT_PRICE')
  }

  renderPopupForm() {
    return (
      <div className={style.popupWrapper}>
        <CallbackPopup
          onClose={this.onCallbackClose}
          onSubmit={this.onCallbackSubmit}
        />
      </div>
    )
  }

  render() {
    const { mediaQueries } = this.props
    if (!mediaQueries) return null

    const { callbackForm } = this.state
    const reviewsToShow = this.props.reviewsToShow || 10
    const mobile = mediaQueries.medium

    const constraints = {
      problem: {
        presence: { allowEmpty: false },
      }
    }

    const innerClass = classNames({
      [style.inner]: !mobile,
      [style.mobile]: mobile
    })

    return (
      <div className={style.background}>
        <Container responsive={true}>
          <div className={innerClass}>
            <div className={style.countPrice}>
              <h3 className={style.heading}>
                Рассчитайте стоимость лечения
              </h3>
              <AppearOnScrollReach
                coefficient={0.7}
                offset={{ y: 50 }}
                duration={500}
              >
                <div className={style.countForm}>
                  <div className={style.countFormInner}>
                    <Form
                      onSubmit={this.onCountFormSubmit}
                      constraints={constraints}
                    >
                      <div className={style.inputGroup}>
                        <div className={style.problemInput}>
                          <TextInput
                            type='textarea'
                            name='problem'
                            label='Опишите вашу проблему'
                            rows='6'
                          />
                        </div>
                      </div>
                      <div  className={style.countBtn}>
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
            <div className={style.reviews}>
              <h3 className={style.heading}>
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
        </Container>
      </div>
    )
  }
}


CountReview = connect(mapStateToProps, mapDispatchToProps)(CountReview)

export { CountReview }
