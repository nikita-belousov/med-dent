import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import { LOADING_TIME } from '../../constants/config'
import { APP_LOADED, APP_UNLOADED } from '../../constants/actionTypes'
import agent from '../../agent'
import style from './App.css'
import { Layout, AppLoading } from '../index'
import * as routes from '../__routes__'
import * as pages from '../__pages__'

import 'normalize-css'
import '../../styles/global.css'
import '../../styles/myfonts.css'


const mapDispatchToProps = dispatch => ({
  onLoad: onPageNotFound =>
    dispatch({ type: APP_LOADED, onPageNotFound })
})

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
    const className = classNames({
      [style.isLoading]: this.props.isLoading,
      [style.ready]: !this.props.isLoading
    })

    return (
      <div className={className}>
        <BrowserRouter>
          <Fragment>
            {this.props.isLoading && <AppLoading />}

            <Layout>
              {this.state.pageNotFound ? <pages.NotFoundPage /> : <Routes />}
            </Layout>
          </Fragment>
        </BrowserRouter>
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
      render={routes.NewsRoutes}
    />
    <Route
      path='/specials'
      render={routes.SpecialsRoutes}
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

    <Route component={pages.NotFoundPage} />
  </Switch>


App = connect(mapStateToProps, mapDispatchToProps)(App)
export { App }
