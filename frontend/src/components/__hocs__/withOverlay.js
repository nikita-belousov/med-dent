import React, { Component } from 'react'


export const withOverlay = WrappedComponent =>
  class extends Component {
    componentWillMount() {
      window.document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
      window.document.body.style.overflow = 'auto'
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
