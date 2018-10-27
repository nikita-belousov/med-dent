import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withRouter, Route, Link, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { LOADING_TIME } from '../../constants/config'
import { APP_LOADED, APP_UNLOADED } from '../../constants/actionTypes'
import agent from '../../agent'
import style from './App.css'
import { Maintenance, Layout, AppLoading, YaMetrika } from '../index'
import * as routes from '../__routes__'
import * as pages from '../__pages__'

import 'normalize-css'
import '../../styles/global.css'
import '../../styles/myfonts.css'


const mapStateToProps = state => ({ ...state.common })


let App = class extends Component {
  static childContextTypes = {
    onPageNotFound: PropTypes.func
  }

  state = { pageNotFound: false }

  getChildContext() {
    return {
      onPageNotFound: this.onPageNotFound
    }
  }

  onPageNotFound = () => {
    this.setState({ pageNotFound: true })
  }

  render() {
    const { maintenance, isLoading, mediaQueries } = this.props

    const className = classNames({
      [style.isLoading]: isLoading,
      [style.ready]: !isLoading
    })

    return (
      <div className={className}>
        <YaMetrika />
        <Helmet
          titleTemplate='Мед-Дент - %s'
          defaultTitle='Стоматология Мед-Дент'
        />
        {maintenance && <Maintenance />}
        {!maintenance &&
          <Fragment>
            {isLoading && <AppLoading />}
            <Layout>
              {this.state.pageNotFound ? <pages.NotFoundPage /> : <Routes />}
            </Layout>
          </Fragment>}
      </div>
    )
  }
}

const Routes = () =>
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
      component={pages.ContactsPage}
    />

    <Route
      path='/reviews'
      component={routes.ReviewsRoutes}
    />
    <Route
      path='/questions'
      component={routes.QuestionsRoutes}
    />
    <Route
      path='/staff'
      component={routes.StaffRoutes}
    />

    <Route
      path='/news'
      component={routes.NewsRoutes}
    />
    <Route
      path='/specials'
      component={routes.SpecialsRoutes}
    />

    <Route
      exact
      path='/dentists/:slug'
      component={pages.DentistPage}
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

    <Route
      exact
      path='/policy'
      component={pages.Policy}
    />

    <Route component={pages.NotFoundPage} />
  </Switch>


App = connect(mapStateToProps)(App)
App = withRouter(App)

export { App }
