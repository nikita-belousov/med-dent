import React, { Component } from 'react'
import _ from 'lodash'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from './../styles/components/MainMenu.css'
import Container from './Container'
import Popup from './Popup'
import Button from './common/Button'
import Link from './common/Link'

import { ServiceCategories as api } from './../agent'

import {
  SERVICE_CATEGORIES_LOADED,
  SERVICE_CATEGORIES_UNLOADED
} from './../constants/actionTypes'

const mapStateToProps = state => ({
  links: state.common.serviceCategories
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: SERVICE_CATEGORIES_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: SERVICE_CATEGORIES_UNLOADED })
})

class MainMenu extends Component {
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
        activeClassName={styles['category-link--active']}
        className={styles['category-link']}
      >
        {_.capitalize(title)}
      </NavLink>
    </li>

  render() {
    let { links } = this.props

    if (!links || links.length === 0) {
      return null
    }

    links = links.sort((a, b) => a.order > b.order)

    return (
      <div className={styles['wrapper']}>
        <div className={styles['bg']}>
          <Container>
            <ul className={styles['navigation']}>
              {links.map(this.renderLink)}
            </ul>
          </Container>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)
