import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppointmentModal from './../AppointmentModal'
import FloatingSection from './../FloatingSection'
import Container from './../Container'
import Header from './../sections/Header'
import MainMenu from './../MainMenu'
import CountReview from './../sections/CountReview'
import NewsSlider from './../sections/NewsSlider'
import Footer from './../sections/Footer'

import { APPOINTMENT_CLOSE } from './../../constants/actionTypes'


const mapStateToProps = ({ appointment }) => ({
  isAppointmentActive: appointment.isActive
})

const mapDispatchToProps = dispatch => ({
  closeAppointmentModal: () => dispatch({ type: APPOINTMENT_CLOSE })
})


const Layout = ({
  children,
  isAppointmentActive,
  closeAppointmentModal,
  location
}) => {
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
        <MainMenu />
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


const connected = connect(mapStateToProps, mapDispatchToProps)(Layout)
export default withRouter(connected)
