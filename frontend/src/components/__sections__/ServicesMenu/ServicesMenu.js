import React, { Component } from 'react'
import capitalize from 'lodash/capitalize'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchServicesCategories } from '../../../actions'
import style from './ServicesMenu.css'
import { Button, Link, Container } from '../../__basic__'
import { Popup }  from '../../__overlay__'


const mapStateToProps = state => ({ links: state.common.menuLinks })

const mapDispatchToProps = { fetchServicesCategories }


let ServicesMenu = class extends Component {
  componentWillMount() {
    this.props.fetchServicesCategories()
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
