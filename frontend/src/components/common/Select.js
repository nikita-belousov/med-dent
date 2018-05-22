import React, { Component } from 'react'
import uuid from 'small-uuid'

import styles from './../../styles/components/common/Select.css'
import AppearAnimation from './../AppearAnimation'
import effectsStyles from './../../styles/libs/effects.css'
import FontAwesome from 'react-fontawesome'
import ClosesOnExternalClick from './../ClosesOnExternalClick'

class Select extends Component {
  state = { selecting: false }

  componentWillMount() {
    if (this.props.defaultOption) {
      this.changeCurrent(this.props.defaultOption.value)
    }
  }

  startSelecting = () => {
    this.setState(prev => ({
      ...prev,
      selecting: true
    }))
  }

  endSelecting = () => {
    this.setState(prev => ({
      ...prev,
      selecting: false
    }))
  }

  changeCurrent = value => {
    this.props.onChange({
      target: {
        name: this.props.name,
        value: value
      }
    })
  }

  handleOptionClick = (e, value) => {
    e.nativeEvent.stopImmediatePropagation()

    this.changeCurrent(value)
    this.endSelecting()
  }

  renderOptions(options) {
    if (!options || options.length === 0) {
      return null
    }

    return (
      <AppearAnimation>
        <div className={styles['options-list']}>
          <ClosesOnExternalClick onClose={this.endSelecting}>
            {options.map(({ value, name }) =>
              <div
                className={styles['option']}
                key={value}
                value={value}
                onClick={e => this.handleOptionClick(e, value)}
              >
                {name}
              </div>
            )}
          </ClosesOnExternalClick>
        </div>
      </AppearAnimation>
    )
  }

  render() {
    const { options, placeholder, defaultOption, value } = this.props
    const { selecting } = this.state

    let currentName

    if (!options && value) {
      currentName = defaultOption.name
    } else if (value) {
      currentName = options
        .find(option => option.value === value)
        .name
    } else {
      currentName = placeholder || 'Выберите из списка...'
    }

    return (
      <div className={styles['select' + (selecting ? '--selecting' : '')]}>
        <div
          className={styles['current']}
          onClick={this.startSelecting}
        >
          <div className={styles['current-name']}>
            {currentName}
          </div>
          <div className={styles['angle-wrapper']}>
            <FontAwesome name='angle-down' />
          </div>
        </div>
        {selecting && this.renderOptions(options)}
      </div>
    )
  }
}

export default Select
