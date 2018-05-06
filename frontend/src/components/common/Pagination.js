import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './../../styles/components/common/Pagination.css'

import Link from './Link'
import NavLink from './NavLink'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'

class Pagination extends Component {
  static contextTypes = {
    onPageNotFound: PropTypes.func
  }

  static propTypes = {
    itemsComponent: PropTypes.func,
    itemsOnPage: PropTypes.number,
    api: PropTypes.string
  }

  static defaultProps = {
    itemsOnPage: 8
  }

  constructor(props) {
    super(props)
    this.state = { totalItems: null }
    this.firstVisibleNum = 0
  }

  componentDidMount() {
    this.loadTotalItems()
  }

  loadTotalItems() {
    fetch(`${process.env.REACT_APP_API_ROOT}/${this.props.api}-quantity`)
      .then(data => data.json())
      .then(json => this.setState({ totalItems: json.quantity }))
  }

  renderPage(num) {
    console.log(this.totalPages, num)

    if (!_.times(this.totalPages).includes(num - 1)) {
      this.context.onPageNotFound()
    }

    return (
      <div className={styles['page']}>
        <div className={styles['items']}>
          {this.renderItems(num)}
        </div>
        {(this.totalPages > 1) &&
          <div className={styles['pagination']}>
            {this.renderPagination(num)}
          </div>}
      </div>
    )
  }

  renderItems(pageNum) {
    const { itemsComponent, api, itemsOnPage, query } = this.props

    return React.createElement(itemsComponent, {
      api,
      query: `${api}?_sort=datePublished:desc&_start=${itemsOnPage * pageNum}&_limit=${itemsOnPage}`
       + (query ? `&${query}` : '')
    })
  }

  renderPagination(pageNum) {
    const { match, api, itemsOnPage } = this.props

    return (
      <div className={styles['nav']}>
        <div className={styles['links-inner']}>
          {(pageNum > 0) &&
            <div className={styles['prev']}>
              <NavLink to={`${match.url}/pages/${pageNum - 1}`}>
                ←
              </NavLink>
            </div>}
          {_.times(this.totalPages).map(num =>
            <div key={num}>
              <div className={styles['nav-link']}>
                <NavLink to={`${match.url}/pages/${num}`}>
                  {num}
                </NavLink>
              </div>
            </div>)}
          {(pageNum < this.totalPages - 1) &&
            <div className={styles['next']}>
              <NavLink to={`${match.url}/pages/${pageNum + 1}`}>
                →
              </NavLink>
            </div>}
        </div>
      </div>
    )
  }

  render() {
    if (!this.state.totalItems) return null

    this.totalPages = Math.ceil(this.state.totalItems / this.props.itemsOnPage)
    const { match } = this.props

    return (
      <Router>
        <div>
          <Route
            exact
            path={`${match.path}`}
            render={() => <Redirect to={`${match.path}/pages/0`} />}
          />
          <Route
            exact
            path={`${match.path}/pages/:pageNum`}
            render={({ match }) => this.renderPage(parseInt(match.params.pageNum))}
          />
        </div>
      </Router>
    )
  }
}

export default withRouter(Pagination)
