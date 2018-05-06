import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Page } from './'

import {
  PAGINATED_PAGE_LOADED,
  PAGINATED_PAGE_UNLOADED
} from './../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.paginatedPage
})

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload, path) => {
    dispatch({ type: 'PAGINATED_PAGE_LOADED', payload, path })
  },
  onUnload: () => {
    dispatch({ type: 'PAGINATED_PAGE_UNLOADED' })
  }
})

class Pagination extends Component {
  static propTypes = {
    api: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    pageToShow: PropTypes.number.isRequired,
    itemsComponent: PropTypes.func,
    itemComponent: PropTypes.func,
    itemsOnPage: PropTypes.number,
    sort: PropTypes.string
  }

  static defaultProps = {
    itemsOnPage: 8
  }

  static contextTypes = {
    onPageNotFound: PropTypes.func
  }

  componentWillMount() {
    const { api, path, onLoad, pageToShow, itemsOnPage } = this.props

    onLoad(
      api.page,
      api.page(itemsOnPage, pageToShow),
      path
    )
  }

  componentWillUpdate(nextProps) {
    if (nextProps.pageToShow !== this.props.pageToShow) {

      const { api, path, onLoad, itemsOnPage } = this.props
      onLoad(
        api.page,
        api.page(itemsOnPage, nextProps.pageToShow),
        path
      )
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    const {
      count,
      docs,
      pageToShow,
      itemsOnPage,
      pager,
      itemComponent,
      path
    } = this.props

    if (!count || !docs) {
      return null
    }

    const totalPages = Math.ceil(count / itemsOnPage)

    if (!_.times(totalPages).includes(pageToShow - 1)) {
      this.context.onPageNotFound()
      return null
    }

    return (
      <Page
        count={count}
        docs={docs}
        pager={pager}
        pageToShow={pageToShow}
        totalPages={totalPages}
        itemComponent={itemComponent}
        path={path}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
