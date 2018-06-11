import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import { LOADING_TIME } from '../../constants/config'
import { APP_LOADED, APP_UNLOADED } from '../../constants/actionTypes'
import agent from '../../agent'
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

  componentWillMount() {
    // setTimeout(() => this.props.onLoad(this.onPageNotFound), LOADING_TIME)
    setTimeout(() => this.props.onLoad(this.onPageNotFound))
  }

  getChildContext() {
    return {
      onPageNotFound: this.onPageNotFound
    }
  }

  onPageNotFound = () => {
    this.setState({ pageNotFound: true })
  }

  render() {
    const appContent =
      <BrowserRouter>
        <Layout>
          {this.state.pageNotFound
            ? <pages.NotFoundPage />
            : <Routes />}
        </Layout>
      </BrowserRouter>

    const appLoading = <AppLoading />

    return this.props.isLoading ? appLoading : appContent
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
      render={() =>
        <routes.ArticlesRoutes
          path='news'
          api={agent.News}
          title='Новости'
        />}
    />
    <Route
      path='/specials'
      render={() =>
        <routes.ArticlesRoutes
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

    <Route component={pages.NotFoundPage} />
  </Switch>


App = connect(mapStateToProps, mapDispatchToProps)(App)
export { App }
