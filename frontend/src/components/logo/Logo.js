import React from 'react'
import classNames from 'classnames'
import InlineSVG from 'svg-inline-react'

import styles from './Logo.css'
import logoSign from '../../assets/images/logo/logo-sign.svg'
import logoTitle from '../../assets/images/logo/logo-title.svg'


export const Logo = ({ minified }) => {
  const cls = classNames({
    'logo': !minified,
    'minified': minified
  })

  return (
    <div className={styles[cls]}>
      <div className={styles['sign']}>
        <InlineSVG src={logoSign} />
      </div>
      {!minified &&
        <div className={styles['title']}>
          <InlineSVG src={logoTitle} />
        </div>}
    </div>
  )
}
