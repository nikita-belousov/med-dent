import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import styles from './../../styles/components/pages/Layout.css'

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
    <div className={styles['layout']}>
      <MuiThemeProvider>
        <div>
          {isAppointmentActive &&
            <AppointmentModal onClose={onAppointmentClose} />}
          <Container>
            <FloatingSection state='collapsed' />
            <Header />
          </Container>
          <MainMenu api='category?_sort=order' />
          <div className='current-page'>
            {children}
          </div>
          <CountReview reviewsToShow={10} />
          <NewsSlider api='news?_sort=published:desc' />
          <Footer />
        </div>
      </MuiThemeProvider>
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
