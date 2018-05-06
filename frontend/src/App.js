import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import 'normalize-css'
import './styles/global.css'
import './styles/myfonts.css'
import styles from './styles/components/App.css'

import * as pages from './components/pages'
import * as routes from './components/routes'

import {
  APP_LOADED,
  APP_UNLOADED
} from './constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  onLoad: onPageNotFound =>
    dispatch({ type: APP_LOADED, onPageNotFound })
})

class App extends Component {
  static childContextTypes = {
    onPageNotFound: PropTypes.func
  }

  state = {
    pageNotFound: false
  }

  componentWillMount() {
    this.props.onLoad(this.onPageNotFound)
  }

  getChildContext() {
    return {
      onPageNotFound: this.onPageNotFound
    }
  }

  onPageNotFound = () => {
    this.setState({ pageNotFound: true })
  }

  renderRoutes() {
    return (
      <Switch>
        <Route
          exact path='/'
          component={pages.HomePage}
        />
        <Route
          exact path='/about-us'
          component={pages.AboutUsPage}
        />
        <Route
          exact path='/pricelist'
          component={pages.PricelistPage}
        />
        <Route
          exact path='/contacts'
          component={pages.Contacts}
        />

        <routes.Specials />
        <routes.News />
        <routes.Reviews />
        <routes.Questions />
        <routes.Staff />

        <routes.ServiceCategories />

        <Route component={pages.NotFound} />
      </Switch>
    )
  }

  render() {
    return (
      <Router>
        <pages.Layout>
          {this.state.pageNotFound
            ? <pages.NotFound />
            : this.renderRoutes()}
        </pages.Layout>
      </Router>
    )
  }
}

export default connect(() => ({}), mapDispatchToProps)(App)
