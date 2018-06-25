import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import capitalize from 'lodash/capitalize'
import { connect } from 'react-redux'

import { fetchServicesCategories } from '../../../actions'
import style from './ServicesMenu.css'
import { Button, Link, Container, NavLink } from '../../__basic__'
import { Popup }  from '../../__overlay__'


const mapStateToProps = state => ({ links: state.common.menuLinks })

const mapDispatchToProps = { fetchServicesCategories }


let ServicesMenu = class extends Component {
  componentWillMount() {
    console.log(123123)
    this.props.fetchServicesCategories()
  }

  onLinkClick = () => {
    this.forceUpdate()
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
        onClick={this.onLinkClick}
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
ServicesMenu = withRouter(ServicesMenu)

export { ServicesMenu }
