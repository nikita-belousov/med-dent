import React, { Component } from 'react'
import { withRouter, HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import { Paragraph, NavLink } from './common'
import PositionLabel from './common/PositionLabel'
import styles from './../styles/components/Dentist.css'

import { SET_DEFAULT_DENTIST } from './../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  setDefaultDentist: (value, name) => {
    dispatch({ type: SET_DEFAULT_DENTIST, payload: { value, name } })
  }
})

class Dentist extends Component {
  onAppointmentClick = () => {
    const { optionValue, optionName, setDefaultDentist } = this.props

    setDefaultDentist(optionValue, optionName)
  }

  render() {
    const { imageFolder, name, about, positions, experience, _id } = this.props

    let thumbSrc
    if (imageFolder) {
      thumbSrc = require(`./../assets/images/staff/${imageFolder}/thumb.png`)
    }

    return (
      <div className={styles['dentist']}>
        <div className={styles['aside']}>
          <div
            className={styles['photo']}
            style={{ backgroundImage: thumbSrc ? `url(${thumbSrc})` : 'grey' }}
          />
        </div>
        <div className={styles['content']}>
          <div className={styles['main-info']}>
            <div className={styles['name']}>
              {name}
            </div>
            <div className={styles['positions-list']}>
              {positions.map(position =>
                <div
                  key={position}
                  className={styles['label-wrapper']}
                >
                  <PositionLabel>
                    {position}
                  </PositionLabel>
                </div>
              )}
            </div>
            <div className={styles['experience']}>
              {`Стаж ${experience}`}
            </div>
          </div>
          <div className={styles['description']}>
            <Paragraph>
              {about}
            </Paragraph>
            <HashRouter hashType='noslash'>
                <span onClick={this.onAppointmentClick}>
                  <NavLink
                    to='appointment'
                    type='dashed'
                    isActive={() => false}
                  >
                    <FontAwesome name='edit' />
                    {' '}
                    Записаться к этому врачу
                  </NavLink>
                </span>
            </HashRouter>
          </div>
        </div>
      </div>
    )
  }
}

const connected = connect(() => ({}), mapDispatchToProps)(Dentist)
export default withRouter(connected)
