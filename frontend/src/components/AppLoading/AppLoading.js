import React from 'react'
import { connect } from 'react-redux'
import style from './AppLoading.css'
import InlineSVG from 'svg-inline-react'
import logoSign from '../../assets/images/logo/logo-sign.svg'


const mapStateToProps = ({ common }) => ({ completion: common.loadingCompletion })


let AppLoading = ({ completion }) =>
  <div className={style.wrapper}>
    <div className={style.loader}>
      <div className={style.logo}>
        <InlineSVG src={logoSign} />
      </div>
      <div className={style.completionWrapper}>
        <div
          className={style.completion}
          style={{ width: `${completion * 100}%` }}
        />
      </div>
    </div>
  </div>


AppLoading = connect(mapStateToProps)(AppLoading)

export { AppLoading }
