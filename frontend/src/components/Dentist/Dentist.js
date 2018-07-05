import React, { Component } from 'react'
import { withRouter, HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import style from './Dentist.css'
import { Paragraph, NavLink, Link, PositionLabel } from '../__basic__'


export const Dentist = ({ imageFolder, name, about, positions, experience, slug }) => {
  let photoSrc
  if (imageFolder) {
    photoSrc = require(`../../assets/images/staff/${imageFolder}/thumb.png`)
  }

  return (
    <NavLink to={`/dentists/${slug}`}>
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
    </NavLink>
  )
}
