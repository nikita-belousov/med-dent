import React from 'react'
import style from './AppLoading.css'
import InlineSVG from 'svg-inline-react'
import sign from '../logo/svg/logo-sign.svg'


export const AppLoading = () =>
  <div className={style.wrapper}>
    <div className={style.loader}>
      <div className={style.logo}>
        <InlineSVG src={sign} />
      </div>
      <div className={style.circle} />
      <div className={style.circle} />
      <div className={style.circle} />
    </div>
  </div>
