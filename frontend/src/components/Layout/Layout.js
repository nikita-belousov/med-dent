import React, { Fragment, Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Container } from '../__basic__'
import { ServicesMenu, Header, CountReview, NewsSlider, Footer }  from '../__sections__'
import { AppointmentModal, FloatingSection } from '../__overlay__'


const mapStateToProps = state => ({ mediaQueries: state.common.mediaQueries })


let Layout = ({ children, mediaQueries }) => {
  if (!mediaQueries) return null

  const wrapperClass = classNames({
    'medium': mediaQueries.medium,
    'small': mediaQueries.small,
    'xsmall': mediaQueries.xsmall
  })

  return (
    <MuiThemeProvider>
      <div className={wrapperClass}>
        <AppointmentModal />
        <FloatingSection collapsed={mediaQueries.small} />
        <Header />
        <Fragment>
          {children}
        </Fragment>
        <CountReview />
        <NewsSlider />
        <Footer />
      </div>
    </MuiThemeProvider>
  )
}


Layout = connect(mapStateToProps)(Layout)

export { Layout }
