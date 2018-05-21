import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, HashRouter, NavLink } from 'react-router-dom'
import _ from 'lodash'

import styles from './../styles/components/FloatingSection.css'
import Button from './common/Button'
import Link from './common/Link'
import Paragraph from './common/Paragraph'
import TextInput from './common/TextInput'
import CallbackPopup from './CallbackPopup'
import AppointmentModal from './AppointmentModal'

import { callback } from './../agent'

import { APPOINTMENT_SHOW } from './../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  showAppointmentModal: () => dispatch({ type: APPOINTMENT_SHOW })
})

class FloatingSection extends React.Component {
  state = {
    collapsed: false,
    callbackForm: false,
    appointmentModal: false
  }

  componentWillMount() {
    if (this.props.location.hash === '#appointment') {
      this.props.showAppointmentModal()
    }
  }

  componentDidMount() {
    this.initYOffset = window.pageYOffset
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillReceiveProps({ location }) {
    if (this.props.location !== location) {
      if (location.hash === '#appointment') {
        this.props.showAppointmentModal()
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  openAppointmentModal = () => {
    this.setState(prev => ({
      ...prev,
      appointmentModal: true
    }))
  }

  closeAppointmentModal = () => {
    this.props.history.push(this.props.location.pathname)
    this.setState(prev => ({
      ...prev,
     appointmentModal: false
    }))
  }

  handleScroll = () => {
    if (window.pageYOffset !== this.initYOffset && !this.state.collapsed)
      this.toggleCollapsed()
  }

  toggleCollapsed = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }))
  }

  handleCallbackCLick = e => {
    e.nativeEvent.preventDefault()
    e.nativeEvent.stopImmediatePropagation()

    if (this.state.callbackForm) return

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

  onCallbackSubmit(data) {
    callback(data)
  }

  renderPopupForm() {
    return (
      <div className={styles['wrapper-call']}>
        <CallbackPopup
          onClose={this.onCallbackClose}
          onSubmit={this.onCallbackSubmit}
        />
      </div>
    )
  }

  render() {
    const { appointmentModal, callbackForm } = this.state

    return (
      <div className={styles['wrapper']}>
        {callbackForm && this.renderPopupForm()}
        <div className={styles['wrapper-main']}>
          <div className={this.state.collapsed
            ? styles['floating-section--collapsed']
            : styles['floating-section']}
          >
            <div className={styles['container']}>
              <div className={styles['calling']}>
                <div className={styles['phone-number']}>
                  8 (495) 135-37-50
                </div>
                <Link
                  type={'alt-dashed'}
                  isActive={this.state.callbackForm}
                  onClick={this.handleCallbackCLick}
                >
                  Перезвонить мне
                </Link>
              </div>
            </div>
            <div className={styles['middle-section']}>
              <div className={styles['container']}>
                <div className={styles['address']}>
                  <i className={styles['address-icon']} />
                  <Paragraph type='small'>
                    Домодедово, ул. Кирова, <br/> д. 7, корп. 1
                  </Paragraph>
                </div>
                <div className={styles['schedule']}>
                  <i className={styles['schedule-icon']} />
                  <Paragraph type='small'>
                    Пн — Вс с 9.00 до 20.00
                  </Paragraph>
                </div>
              </div>
            </div>
            <div className={styles['container']}>
              <div className={styles['btn-wrapper']}>
                <HashRouter hashType='noslash'>
                  <NavLink to="appointment">
                    <Button type='primary'>
                      Записаться на прием
                    </Button>
                  </NavLink>
                </HashRouter>
              </div>
              <div
                className={styles['nav-arrow']}
                onClick={this.toggleCollapsed}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(() => ({}), mapDispatchToProps)(FloatingSection))
