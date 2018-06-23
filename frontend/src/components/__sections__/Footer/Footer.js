import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import style from './Footer.css'
import uuid from 'small-uuid'
import FontAwesome from 'react-fontawesome'

import { FOOTER_LINKS } from '../../../constants/config'
import { Link, Container } from '../../__basic__'
import { License } from '../../License'
import { PaymentMethods } from '../../PaymentMethods'


const mapStateToProps = state => ({ mediaQueries: state.common.mediaQueries })


let Footer = ({ mediaQueries }) => {
  if (!mediaQueries) return null

  const mobile = mediaQueries.small

  const className = classNames({
    [style.footer]: true,
    [style.mobile]: mobile
  })

  return (
    <div className={className}>
      <Container responsive={true}>
        <div className={style.info}>
          <div className={style.licenseWrapper}>
            <License />
          </div>
          <div className={style.paymentWrapper}>
            <PaymentMethods />
          </div>
        </div>
        <div className={style.copyright}>
          <p> © Стоматология «Мед-Дент», 2011–2018. Все права защищены. </p>
        </div>
        <div
          className={style.discretion}
          title="Имеются противопоказания. Необходима консультация специалиста"
          >
            <p> ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА </p>
          </div>
        </Container>
      </div>
  )
}


Footer = connect(mapStateToProps)(Footer)

export { Footer }
