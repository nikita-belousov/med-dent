import React from 'react'
import FontAwesome from 'react-fontawesome'
import style from './WarningBanner.css'
import Container from './../Container'


export const WarningBanner = ({ text }) =>
  <div className={style.banner}>
    <Container>
      <p className={style.text}>
        <span className={style.icon}>
          <FontAwesome name="info-circle" />
        </span>
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </p>
    </Container>
  </div>
