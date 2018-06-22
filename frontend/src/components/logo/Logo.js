import React from 'react'
import classNames from 'classnames'
import InlineSVG from 'svg-inline-react'

import style from './Logo.css'
import logoSign from '../../assets/images/logo/logo-sign.svg'
import logoTitle from '../../assets/images/logo/logo-title.svg'


export const Logo = ({ minified, inverted, caption }) => {
  const logoClass = classNames({
    [style.logo]: !minified,
    [style.minified]: minified,
    [style.inverted]: inverted,
  })

  return (
    <div className={logoClass}>
      <div className={style.sign}>
        <InlineSVG src={logoSign} />
      </div>

      <div
        style={{ visibility: caption ? 'visible' : 'hidden' }}
        className={style.title}
      >
        <InlineSVG src={logoTitle} />
      </div>
    </div>
  )
}


Logo.defaultProps = {
  caption: true
}
