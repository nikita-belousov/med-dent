import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import FloatingSection from './../FloatingSection'
import Container from './../Container'
import Header from './../sections/Header'
import MainMenu from './../MainMenu'
import AppointmentModal from './../AppointmentModal'
import CountReview from './../sections/CountReview'
import NewsSlider from './../sections/NewsSlider'
import Footer from './../sections/Footer'

class Layout extends Component {
  state = { appointmentModal: false }

  openModal = () => {
    this.setState(prev => ({ appointmentModal: true }))
  }

  closeModal = () => {
    this.setState(prev => ({ appointmentModal: false }))
  }

  renderLayout() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            {this.state.appointmentModal && <AppointmentModal onClose={this.closeModal} />}
            <Container>
              <FloatingSection
                state='collapsed'
                onBtnClick={this.openModal}
              />
              <Header />
            </Container>
            <MainMenu api='category?_sort=order' />
            <div className='current-page'>
              {this.props.children}
            </div>
            <CountReview reviewsToShow={10} />
            <NewsSlider api='news?_sort=published:desc' />
            <Footer />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

  render() {
    const { appointmentModal } = this.state

    return this.props.children
      ? this.renderLayout()
      : null
  }
}

export default Layout
