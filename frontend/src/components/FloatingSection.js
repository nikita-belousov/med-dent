import React from 'react'
import _ from 'lodash'
import styles from './../styles/components/FloatingSection.css'
import Button from './common/Button'
import Link from './common/Link'
import Paragraph from './common/Paragraph'
import TextInput from './common/TextInput'
import CallbackPopup from './CallbackPopup'

class FloatingSection extends React.Component {
  state = {
    collapsed: false,
    callbackForm: false
  }

  componentDidMount() {
    this.initYOffset = window.pageYOffset
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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

  handleCallbackCLick = (e) => {
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

  onCallbackSubmit(data) {
    // emailjs.send(
    //   process.env.REACT_APP_MAIL_SERVICE,
    //   '_callback',
    //   {
    //     name: _.capitalize(data.name),
    //     phone: data.phone
    //   }
    // )
    // .then(console.log)
    // .catch(console.log)
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
    return (
      <div className={styles['wrapper']}>
        {this.state.callbackForm && this.renderPopupForm()}
        <div className={styles['wrapper-main']}>
          <div className={this.state.collapsed
            ? styles['floating-section--collapsed']
            : styles['floating-section']}
          >
            <div className={styles['container']}>
              <div className={styles['calling']}>
                <div className={styles['phone-number']}>
                  8 (496) 797 83 06
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
                <Button
                  type='primary'
                  onClick={this.props.onBtnClick}
                >
                  Записаться на прием
                </Button>
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

export default FloatingSection
