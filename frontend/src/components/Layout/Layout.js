import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { APPOINTMENT_CLOSE } from './../../constants/actionTypes'
import { Container } from '../__basic__'
import { ServicesMenu, Header, CountReview, NewsSlider, Footer }  from '../__sections__'
import { AppointmentModal, FloatingSection } from '../__overlay__'


const mapStateToProps = ({ appointment }) => ({
  isAppointmentActive: appointment.isActive
})

const mapDispatchToProps = dispatch => ({
  closeAppointmentModal: () => dispatch({ type: APPOINTMENT_CLOSE })
})


let Layout = ({ children, isAppointmentActive, closeAppointmentModal, location }) => {
  const onAppointmentClose = () => {
    closeAppointmentModal()
    window.location.replace(location.pathname)
  }

  if (!children) {
    return null
  }

  return (
    <MuiThemeProvider>
      <div>
        {isAppointmentActive &&
          <AppointmentModal onClose={onAppointmentClose} />}
        <Container>
          <FloatingSection state='collapsed' />
        </Container>
        <Header />
        <ServicesMenu />
        <div className='current-page'>
          {children}
        </div>
        <CountReview reviewsToShow={10} />
        <NewsSlider />
        <Footer />
      </div>
    </MuiThemeProvider>
  )
}


Layout = connect(mapStateToProps, mapDispatchToProps)(Layout)
Layout = withRouter(Layout)

export { Layout }
