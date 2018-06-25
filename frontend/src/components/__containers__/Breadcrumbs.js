import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBreadcrumbs } from '../../actions'


const mapDispatchToProps = { updateBreadcrumbs }


let Breadcrumbs = class extends Component {
  componentWillMount() {
    this.props.updateBreadcrumbs(this.props.parentLink)
  }

  render() {
    return this.props.children
  }
}


Breadcrumbs = connect(() => ({}), mapDispatchToProps)(Breadcrumbs)

export { Breadcrumbs }
