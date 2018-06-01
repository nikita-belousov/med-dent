import React from 'react'
import style from './../../styles/components/sections/Footer.css'
import uuid from 'small-uuid'
import FontAwesome from 'react-fontawesome'

import { FOOTER_LINKS } from './../../constants/config'
import Link from './../common/Link'
import Container from './../Container'
import { License } from '../License'
import { PaymentMethods } from '../PaymentMethods'


const Footer = () =>
  <div className={style['footer']}>
    <Container>
      <div className={style.info}>
        <div className={style.licenseWrapper}>
          <License />
        </div>
        <div className={style.paymentWrapper}>
          <PaymentMethods />
        </div>
      </div>
      <div className={style.copyright}>
        <p>
          © Стоматология «Мед-Дент», 2011–2018. Все права защищены.
        </p>
      </div>
      <div
        className={style.discretion}
        title="Имеются противопоказания. Необходима консультация специалиста"
      >
        <p>ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА</p>
      </div>
    </Container>
  </div>


export default Footer
