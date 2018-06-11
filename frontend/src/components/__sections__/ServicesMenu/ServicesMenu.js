import React, { Component } from 'react'
import capitalize from 'lodash/capitalize'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  SERVICE_CATEGORIES_LOADED,
  SERVICE_CATEGORIES_UNLOADED
} from '../../../constants/actionTypes'

import { ServiceCategories as api } from '../../../agent'
import style from './ServicesMenu.css'
import { Button, Link, Container } from '../../__basic__'
import { Popup }  from '../../__overlay__'

const mapStateToProps = state => ({
  links: state.common.serviceCategories
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: SERVICE_CATEGORIES_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: SERVICE_CATEGORIES_UNLOADED })
})


let ServicesMenu = class extends Component {
  componentWillMount() {
    this.props.onLoad(api.all())
  }

  componentWillUnount() {
    this.props.onUnload()
  }

  renderPopupButton = (text) => {
    return (
      <Button type='popup'>
        {text}
      </Button>
    )
  }

  renderLink = ({ slug, title }, i) =>
    <li key={slug}>
      <NavLink
        to={`/${slug}`}
        activeClassName={style.categoryLinkActive}
        className={style.categoryLink}
      >
        {capitalize(title)}
      </NavLink>
    </li>

  render() {
    let { links } = this.props

    if (!links || links.length === 0) {
      return null
    }

    links = links.sort((a, b) => a.order > b.order)

    return (
      <div className={style.wrapper}>
        <div className={style.bg}>
          <Container>
            <ul className={style.navigation}>
              {links.map(this.renderLink)}
            </ul>
          </Container>
        </div>
      </div>
    )
  }
}


ServicesMenu = connect(mapStateToProps, mapDispatchToProps)(ServicesMenu)
export { ServicesMenu }
