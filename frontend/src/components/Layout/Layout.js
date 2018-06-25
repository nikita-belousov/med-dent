import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Container } from '../__basic__'
import { ServicesMenu, Header, CountReview, NewsSlider, Footer }  from '../__sections__'
import { AppointmentModal, FloatingSection } from '../__overlay__'


export const Layout = ({ children }) =>
  <MuiThemeProvider>
    <div>
      <AppointmentModal />
      <Container>
        <FloatingSection />
      </Container>
      <Header />
      <Fragment>
        {children}
      </Fragment>
      <CountReview />
      <NewsSlider />
      <Footer />
    </div>
  </MuiThemeProvider>
