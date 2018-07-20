import React from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { connect } from 'react-redux'
import style from './Footer.css'
import uuid from 'small-uuid'
import FontAwesome from 'react-fontawesome'

import { FOOTER_LINKS } from '../../../constants/config'
import { NavLink, Link, Container, FileLink } from '../../__basic__'
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
            <FileLink
              title={"Лицензия на осуществление медицинской деятельности ООО «Мед-Дент»"}
              size={"5 MB"}
              file={require('../../../assets/docs/license.pdf')}
            />
          </div>
          <div className={style.policyWrapper}>
            <FileLink
              title={"Политика обработки персональных данных"}
              size={"60 KB"}
              file={require('../../../assets/docs/policy.pdf')}
            />
          </div>
          <div className={style.paymentWrapper}>
            <PaymentMethods />
          </div>
        </div>
        <div className={style.copyright}>
          <div className={style.copyrightInner}>
            <p> © Стоматология «Мед-Дент», 2011–2018. Все права защищены. </p>
          </div>
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
Footer = withRouter(Footer)

export { Footer }
