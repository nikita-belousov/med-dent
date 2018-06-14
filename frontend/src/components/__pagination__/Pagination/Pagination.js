import React, { Component } from 'react'
import times from 'lodash/times'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { PaginationPage } from '../index'
import { ITEMS_ON_PAGE } from '../../../constants'

const mapStateToProps = state => ({ ...state.paginatedPage })


let Pagination = class extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    pageToShow: PropTypes.number.isRequired,
    itemsOnPage: PropTypes.number.isRequired,
    gridView: PropTypes.bool,
    itemsComponent: PropTypes.func,
    itemComponent: PropTypes.func,
    sort: PropTypes.string
  }

  static defaultProps = {
    itemsOnPage: ITEMS_ON_PAGE
  }

  static contextTypes = {
    onPageNotFound: PropTypes.func
  }

  componentWillMount() {
    const { dispatch, fetchData, pageToShow } = this.props
    dispatch(fetchData(pageToShow))
  }

  render() {
    const {
      count,
      docs,
      pageToShow,
      pager,
      itemComponent,
      path,
      itemsOnPage,
      gridView
    } = this.props

    if (!count || !docs) {
      return null
    }

    const totalPages = Math.ceil(count / itemsOnPage)

    if (!times(totalPages).includes(pageToShow - 1)) {
      // TODO: избавиться от контекста (в других местах тоже)
      this.context.onPageNotFound()
      return null
    }

    return (
      <PaginationPage
        gridView={gridView}
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


Pagination = connect(mapStateToProps)(Pagination)

export { Pagination }
