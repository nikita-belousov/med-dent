import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { HashRouter, NavLink } from 'react-router-dom'

import { callbackSubmit } from '../../../actions'
import style from './FloatingSection.css'
import { Button, Link, Paragraph, TextInput, Container } from '../../__basic__'
import { CallbackPopup, AppointmentModal }  from '../index'


const mapStateToProps = state => ({ personalData: state.common.personalData  })

const mapDispatchToProps = { callbackSubmit }


let FloatingSection = class extends Component {
  state = {
    collapsed: this.props.collapsed || false,
    callbackForm: false
  }

  componentDidMount() {
    this.wrapperMainHeight = this.wrapperMain.offsetHeight
    this.initYOffset = window.pageYOffset
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (window.pageYOffset !== this.initYOffset && !this.state.collapsed) {
      this.toggleCollapsed()
    }
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

  onCallbackSubmit = data => {
    this.props.callbackSubmit(data)
  }

  onWrapperMainRef = node => {
    if (!this.wrapperMain) {
      this.wrapperMain = node
      this.forceUpdate()
    }
  }

  render() {
    const { appointmentModal, callbackForm } = this.state
    const { personalData } = this.props

    const wrapperMainClass = classNames({
      [style.wrapperMain]: !this.state.collapsed,
      [style.wrapperMainCollapsed]: this.state.collapsed
    })

    return (
      <Container responsive={true}>
        <div className={style.wrapper}>
          {callbackForm &&
            <div className={style.wrapperCall}>
              <CallbackPopup
                onClose={this.onCallbackClose}
                onSubmit={this.onCallbackSubmit}
              />
            </div>}
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
                    <NavLink to={personalData ? 'appointment' : ''}>
                      <Button
                        type='primary'
                        getState={!personalData && (() => 'disabled')}
                      >
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
                    8 (496) 797-83-06
                    <br/>
                    8 (916) 019-38-22
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
      </Container>
    )
  }
}


FloatingSection = connect(mapStateToProps, mapDispatchToProps)(FloatingSection)

export { FloatingSection }
