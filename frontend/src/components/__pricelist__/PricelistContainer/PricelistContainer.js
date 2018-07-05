import React, { Component } from 'react'
import classNames from 'classnames'
import merge from 'lodash/merge'
import lowerCase from 'lodash/lowerCase'
import utils from 'utils'
import { connect } from 'react-redux'
import scrollToWithAnimation from 'scrollto-with-animation'

import { fetchServices } from '../../../actions'
import style from './PricelistContainer.css'
import { PricelistSidebar, PricelistTable } from '../index'


const mapStateToProps = state => ({
  mediaQueries: state.common.mediaQueries,
  ...state.pricelist
})


let PricelistContainer = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: {
        'title': '',
        'social': false
      },
      scrollable: null,
      categories: []
    }

    this.isInitialRender = true
    this.scrollAnimationTime = 800
    this.isAutoScrolling = false
    this.scrollAnimationQueue = []
  }

  componentWillMount() {
    this.props.dispatch(fetchServices())
  }

  componentDidUpdate(prevProps, prevState) {
    const { services } = this.props
    const { scrollable, categories } = this.state

    if (services &&
        this.isInitialRender &&
        scrollable &&
        categories.length === services.length) {
      this.initScrolling()
    }

    if ((!prevProps.services || prevProps.services.length === 0) &&
        (this.props.services && this.props.services.length > 0)) {
      this.setState(prev => ({
        ...prev,
        navbarActive: services[0].id
      }))
    }
  }

  componentWillUnmount() {
    const { scrollable } = this.state
    if (scrollable) {
      scrollable.removeEventListener('scroll', this.onPriceScroll)
    }
  }

  initScrolling() {
    const { scrollable, categories } = this.state

    this.isInitialRender = false

    this.pricesTop = utils.getAbsoluteCoords(scrollable).top
    this.pricesCenter = Math.round(scrollable.offsetHeight / 2)
    this.setCategoriesTops()

    this.onPriceScroll = scrollable.addEventListener('scroll', e => {
      if (this.isAutoScrolling) {
        return null
      }

      const current = categories.find(el => el.id === this.state.navbarActive)

      const currentTop = utils.getAbsoluteCoords(current.node).top
        - this.pricesTop
      const currentBottom = utils.getAbsoluteCoords(current.node).top
        + current.node.offsetHeight
        - this.pricesTop

      if (currentTop > this.pricesCenter) {
        this.setNavbarActive(current.id - 1)
      } else if (currentBottom < this.pricesCenter) {
        this.setNavbarActive(current.id + 1)
      }
    })
  }

  setCategoriesTops() {
    const { categories, scrollable } = this.state

    categories
      .forEach((category) => {
        let top
        if (category.id === 0) {
          top = 0
        } else {
          top = utils.getAbsoluteCoords(category.node).top
            + scrollable.scrollTop
            - this.pricesTop
        }
        category.top = top
      })
  }

  scrollTo(id) {
    const { categories, scrollable } = this.state

    const dest = categories
      .find(el => el.id === id)
      .top

    this.isAutoScrolling = true
    this.scrollAnimationQueue.push(true)

    scrollToWithAnimation(
      scrollable,
      'scrollTop',
      dest,
      this.scrollAnimationTime,
      'easeInOutExpo',
      () => {
        this.scrollAnimationQueue.pop()
        if (this.scrollAnimationQueue.length === 0)
          this.isAutoScrolling = false
      }
    )
  }

  setNavbarActive = id => {
    this.setState(prev => ({
      ...prev,
      navbarActive: id
    }))
  }

  handleNavbarLinkClick = (e, id) => {
    e.preventDefault()
    this.setCategoriesTops()
    this.setNavbarActive(id)
    this.scrollTo(id)
  }

  handleFilterChange = (e) => {
    let { name, value } = e.target

    if (e.target.type === 'checkbox') {
      value = e.target.checked
    }

    this.setState(prev => merge(prev, {
      filter: { [name]: value }
    }))
  }

  applyFilters(data) {
    const { title, social } = this.state.filter

    const byTitle = el =>
      lowerCase(el.title).includes(lowerCase(title).trim())

    const bySocial = el =>
      el.social === social

    const applyChain = (data, chain) =>
      data.filter(el =>
        chain.reduce((res, f) =>
          f(el) ? res : false
        , true)
      )

    const filterChain = []
    if (title) filterChain.push(byTitle)
    if (social) filterChain.push(bySocial)

    return data.reduce((res, category) =>
      res.concat({
        ...category,
        services: applyChain(category.services, filterChain)
      }), [])
  }

  initCategory = (id, node) => {
    const exists = this.state.categories
      .find(el => el.id === id)

    if (this.isInitialRender && !exists) {
      this.setState(prev => ({
        ...prev,
        categories: [
          ...prev.categories,
          { id, node }
        ]
      }))
    }
  }

  initScrollable = (node) => {
    if (!this.state.scrollable) {
      this.setState(prev => ({
        ...prev,
        scrollable: node
      }))
    }
  }

  render() {
    const { services, sidebarLinks, mediaQueries } = this.props
    const { navbarActive, filter } = this.state
    const { title, social } = this.state.filter

    if (!mediaQueries || (!services || services.length === 0)) {
      return null
    }

    const wrapperClass = classNames({
      [style.wrapper]: true,
      [style.medium]: mediaQueries.medium
    })

    return (
      <div className={wrapperClass}>
        <div className={style.columns}>
          <div className={style.side}>
            <PricelistSidebar
              links={sidebarLinks}
              active={navbarActive}
              onLinkClick={this.handleNavbarLinkClick}
            />
          </div>
          <div className={style.main}>
            <div className={style.tableWrapper}>
              <PricelistTable
                interactive
                medium={mediaQueries.medium}
                data={this.applyFilters(services)}
                onScrollableRef={this.initScrollable}
                onCategoryRef={this.initCategory}
                onFilterChange={this.handleFilterChange}
                filterData={filter}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


PricelistContainer = connect(mapStateToProps)(PricelistContainer)

export { PricelistContainer }
