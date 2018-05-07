import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import agent from './agent'

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
          exact
          path='/'
          component={pages.HomePage}
        />
        <Route
          exact
          path='/about-us'
          component={pages.AboutUsPage}
        />
        <Route
          exact
          path='/pricelist'
          component={pages.PricelistPage}
        />
        <Route
          exact
          path='/contacts'
          component={pages.Contacts}
        />

        <Route
          path='/reviews'
          component={routes.Reviews}
        />
        <Route
          path='/questions'
          component={routes.Questions}
        />
        <Route
          path='/staff'
          component={routes.Staff}
        />

        <Route
          path='/news'
          render={() =>
            <routes.Articles
              path='news'
              api={agent.News}
              title='Новости'
            />}
        />
        <Route
          path='/specials'
          render={() =>
            <routes.Articles
              path='specials'
              api={agent.Specials}
              title='Акции'
            />}
        />

        <Route
          exact
          path='/implantaciya'
          component={pages.Implantology}
        />
        <Route
          exact
          path='/ortopediya'
          component={pages.Orthopedics}
        />
        <Route
          exact
          path='/terapiya'
          component={pages.Therapy}
        />
        <Route
          exact
          path='/gigiena'
          component={pages.Hygiene}
        />
        <Route
          exact
          path='/ortodontiya'
          component={pages.Orthodontics}
        />
        <Route
          exact
          path='/hirurgiya'
          component={pages.Surgery}
        />
        <Route
          exact
          path='/detskaya-stomatologiya'
          component={pages.ChildStomatology}
        />

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
