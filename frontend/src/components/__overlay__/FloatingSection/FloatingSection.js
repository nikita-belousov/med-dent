import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withRouter, Route, HashRouter, NavLink } from 'react-router-dom'

import { APPOINTMENT_SHOW } from '../../../constants/actionTypes'
import style from './FloatingSection.css'
import { Button, Link, Paragraph, TextInput } from '../../__basic__'
import { CallbackPopup, AppointmentModal }  from '../index'


const mapDispatchToProps = dispatch => ({
  showAppointmentModal: () => dispatch({ type: APPOINTMENT_SHOW })
})


let FloatingSection = class extends Component {
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
    this.wrapperMainHeight = this.wrapperMain.offsetHeight
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
    // callback(data)
  }

  onWrapperMainRef = node => {
    if (!this.wrapperMain) {
      this.wrapperMain = node
      this.forceUpdate()
    }
  }

  renderPopupForm() {
    return (
      <div className={style.wrapperCall}>
        <CallbackPopup
          onClose={this.onCallbackClose}
          onSubmit={this.onCallbackSubmit}
        />
      </div>
    )
  }

  render() {
    const { appointmentModal, callbackForm } = this.state

    const wrapperMainClass = classNames({
      [style.wrapperMain]: !this.state.collapsed,
      [style.wrapperMainCollapsed]: this.state.collapsed
    })

    return (
      <div className={style.wrapper}>
        {callbackForm && this.renderPopupForm()}
        <div
          ref={this.onWrapperMainRef}
          className={wrapperMainClass}
          style={{ height: this.wrapperMainHeight || 'auto' }}
        >
          <div className={style.floatingSection}>
            <div className={style.container}>
              <div
                className={style.navArrow}
                onClick={this.toggleCollapsed}
              />
              <div className={style.btnWrapper}>
                <HashRouter hashType='noslash'>
                  <NavLink to='appointment'>
                    <Button type='primary'>
                      Записаться на прием
                    </Button>
                  </NavLink>
                </HashRouter>
              </div>
            </div>
            <div className={style.middleSection}>
              <div className={style.container}>
                <div className={style.address}>
                  <i className={style.addressIcon} />
                  <Paragraph type='small'>
                    Домодедово, ул. Кирова, <br/> д. 7, корп. 1
                  </Paragraph>
                </div>
                <div className={style.schedule}>
                  <i className={style.scheduleIcon} />
                  <Paragraph type='small'>
                    Пн — Вс с 9.00 до 20.00
                  </Paragraph>
                </div>
              </div>
            </div>
            <div className={style.container}>
              <div className={style.calling}>
                <div className={style.phoneNumber}>
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
          </div>
        </div>
      </div>
    )
  }
}


FloatingSection = connect(() => ({}), mapDispatchToProps)(FloatingSection)
FloatingSection = withRouter(FloatingSection)

export { FloatingSection }
