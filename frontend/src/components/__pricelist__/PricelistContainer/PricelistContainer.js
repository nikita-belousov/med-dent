import React, { Component } from 'react'
import merge from 'lodash/merge'
import lowerCase from 'lodash/lowerCase'
import utils from 'utils'
import { connect } from 'react-redux'
import scrollToWithAnimation from 'scrollto-with-animation'

import {
  PRICELIST_LOADED,
  PRICELIST_UNLOADED
} from '../../../constants/actionTypes'

import { Services as api } from '../../../agent'
import style from './PricelistContainer.css'
import { PricelistSidebar, PricelistTable } from '../index'


const mapStateToProps = state => ({
  ...state.pricelist
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: PRICELIST_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: PRICELIST_UNLOADED })
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
    this.props.onLoad(api.all())
  }

  componentWillReceiveProps(nextProps) {
    const { services } = this.props
    const nextServices = nextProps.services

    if (!services || services.length === 0) {
      if (!nextServices || nextServices.length === 0) {
        return null
      }

      this.data = this.prettify(nextServices)

      this.setState(prev => ({
        ...prev,
        navbarActive: this.data[0].id
      }))
    }
  }

  componentDidUpdate(nextProps, nextState) {
    const { scrollable, categories } = this.state

    if (this.data &&
        this.isInitialRender &&
        scrollable &&
        categories.length === this.data.length) {
      this.initScrolling()
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

  componentWillUnmount() {
    const { scrollable } = this.state
    if (scrollable) {
      scrollable.removeEventListener('scroll', this.onPriceScroll)
    }

    this.props.onUnload()
  }

  prettify(data) {
    return data
      .reduce((res, serv) => {
        if (serv.category) {
          const { title, order } = serv.category
          const exists = res.find(e => e.title === title)

          if (exists) {
            exists.services.push(serv)
          } else {
            res.push({ id: order, title, services: [serv] })
          }
        }

        return res
      }, [])
      .sort((a, b) => a.id > b.id)
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
      })
    , [])
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
    let { services } = this.props
    const { title, social } = this.state.filter

    if (!services || services.length === 0) {
      return null
    }

    const { navbarActive, filter } = this.state

    const sidebarLinks = this.data
      .reduce((res, { title, id }) => [ ...res, { title, id } ], [])

    const data = this.applyFilters(this.data)

    return (
      <div>
        <div className={style.columns}>
          <div className={style.side}>
            <PricelistSidebar
              links={sidebarLinks}
              active={navbarActive}
              onLinkClick={this.handleNavbarLinkClick}
            />
          </div>
          <div className={style.main}>
            <PricelistTable
              interactive
              data={data}
              onScrollableRef={this.initScrollable}
              onCategoryRef={this.initCategory}
              onFilterChange={this.handleFilterChange}
              filterData={filter}
            />
          </div>
        </div>
      </div>
    )
  }
}

PricelistContainer = connect(mapStateToProps, mapDispatchToProps)(PricelistContainer)
export { PricelistContainer }
