import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import validate from 'validate.js'
import utils from 'utils'
import _ from 'lodash'

import {
  APPOINTMENT_LOADED,
  APPOINTMENT_UNLOADED
} from '../../../constants/actionTypes'

import { Appointment as appointmentApi, Staff as staffApi } from '../../../agent'
import style from './AppointmentModal.css'
import { ClosesOnExternalClick }  from '../../ClosesOnExternalClick'
import { Form } from '../../__containers__'
import { Modal }  from '../index'
import { Button, TextInput, SelectInput, Paragraph } from '../../__basic__'


const mapStateToProps = state => ({
  ...state.appointment
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: APPOINTMENT_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: APPOINTMENT_UNLOADED })
})


const LOADING_TIME = 2500
const SUCCESS_TEXT = `Спасибо, %username%! Через несколько минут с вами
  свяжется администратор клиники для уточнения деталей приема.`

let AppointmentModal  = class extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    staff: PropTypes.array
  }

  constructor(props) {
    super(props)

    this.contentStateToRender = {
      'form': this.renderForm,
      'success': this.renderSuccess
    }
  }

  state = {
    contentState: 'form' // or 'success'
  }

  componentWillMount() {
    this.props.onLoad(staffApi.options())
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  onFormSubmit = data => {
    this.userName = data.name

    setTimeout(() =>
      this.setState({ contentState: 'success' })
    , LOADING_TIME)

    appointmentApi.post(data)
  }

  toSelectOptions(data) {
    return data.map(doc => ({
      value: doc.optionValue,
      name: doc.optionName
    }))
  }

  renderSuccess = () => {
    const text = SUCCESS_TEXT.replace(
      '%username%',
      _.capitalize(this.userName.trim())
    )

    return (
      <div className={style.successText}>
        <Paragraph type='small'>
          {text}
        </Paragraph>
      </div>
    )
  }

  renderForm = () => {
    const { staff, defaultDentist } = this.props

    return (
      <div className={style.form}>
        <div className={style.inputGroup}>
          <div className={style.inputRow}>
            <div className={style.label}>
              <div className={style.labelText}>
                * Имя
              </div>
            </div>
            <div className={style.field}>
              <div className={style.tinyWrapper}>
                <TextInput name='name' />
              </div>
            </div>
          </div>
          <div className={style.inputRow}>
            <div className={style.label}>
              <div className={style.labelText}>
                * Номер телефона
              </div>
            </div>
            <div className={style.field}>
              <div className={style.tinyWrapper}>
                <TextInput
                  type='tel'
                  name='phone'
                  mask="+7 (999) 999 99 99"
                  maskChar="_"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.inputRow}>
          <div className={style.label}>
            <div className={style.labelText}>
              Врач
            </div>
          </div>
          <div className={style.field}>
            <div className={style.tinyWrapper}>
              <SelectInput
                name='dentist'
                defaultOption={defaultDentist || ''}
                options={staff && this.toSelectOptions(staff)}
              />
            </div>
          </div>
        </div>
        <div className={style.inputRow}>
          <div className={style.label}>
            <div className={style.labelText}>
              * Опишите вашу проблему
            </div>
          </div>
          <div className={style.field}>
            <TextInput
              type='textarea'
              name='problem'
              rows='5'
            />
          </div>
        </div>
        <p className={style.note}>
          * — обязательно для заполнения
        </p>
      </div>
    )
  }

  render() {
    const { staff, onClose } = this.props
    const { contentState } = this.state

    const constraints = {
      name: {
        presence: { allowEmpty: false },
      },
      phone: {
        presence: { allowEmpty: false, },
        format: /\+7 \(9\d{2}\) \d{3} \d{2} \d{2}/
      },
      problem: {
        presence: { allowEmpty: false },
      }
    }

    return (
      <Modal
        heading={'Запись на прием'}
        onClose={onClose}
      >
        <Form
          constraints={constraints}
          withLoading
          onSubmit={this.onFormSubmit}
          loadingTime={LOADING_TIME}
        >
          {this.contentStateToRender[contentState]()}
          <Button
            formSubmit
            width='10em'
            successText='Вы записаны'
          >
            Записаться
          </Button>
        </Form>
      </Modal>
    )
  }
}


AppointmentModal = connect(mapStateToProps, mapDispatchToProps )(AppointmentModal)
export { AppointmentModal }
