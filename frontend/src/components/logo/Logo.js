import React from 'react'
import classNames from 'classnames'
import InlineSVG from 'svg-inline-react'

import styles from './Logo.css'
import sign from './svg/logo-sign.svg'
import title from './svg/logo-title.svg'


export const Logo = ({ minified }) => {
  const cls = classNames({
    'logo': !minified,
    'minified': minified
  })

  return (
    <div className={styles[cls]}>
      <div className={styles['sign']}>
        <InlineSVG src={sign} />
      </div>
      {!minified &&
        <div className={styles['title']}>
          <InlineSVG src={title} />
        </div>}
    </div>
  )
}
