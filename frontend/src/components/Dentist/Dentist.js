import React, { Component } from 'react'
import { withRouter, HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import { SET_DEFAULT_DENTIST } from '../../constants/actionTypes'
import style from './Dentist.css'
import { Paragraph, NavLink, Link, PositionLabel } from '../__basic__'


const mapDispatchToProps = dispatch => ({
  setDefaultDentist: (value, name) => {
    dispatch({ type: SET_DEFAULT_DENTIST, payload: { value, name } })
  }
})


let Dentist = class extends Component {
  onAppointmentClick = () => {
    const { optionValue, optionName, setDefaultDentist } = this.props

    setDefaultDentist(optionValue, optionName)
  }

  render() {
    const { imageFolder, name, about, positions, experience, _id } = this.props

    let photoSrc
    if (imageFolder) {
      photoSrc = require(`../../assets/images/staff/${imageFolder}/thumb.png`)
    }

    return (
      <Link>
        <div className={style.dentist}>
          <div
            className={style.photo}
            style={{ backgroundImage: photoSrc ? `url(${photoSrc})` : 'grey' }}
          />
          <div className={style.about}>
            <div className={style.name}>
              {name}
            </div>
            <div className={style.positionsList}>
              {positions.join(', ')}
            </div>
          </div>
        </div>
      </Link>
    )
  }
}


Dentist = connect(() => ({}), mapDispatchToProps)(Dentist)
Dentist = withRouter(Dentist)

export { Dentist }
