import React, { Component } from 'react'
import capitalize from 'lodash/capitalize'
import style from './PricelistSidebar.css'


export class PricelistSidebar extends Component {
  render() {
    const { links, active, onLinkClick, } = this.props

    return (
      <div className={style.navBar}>
        <ul>
          {links.map(({ title, id }) => {
            const isActive = active === id
            const className = isActive
              ? style.navbarLinkActive
              : style.navbarLink

            return (
              <li
                key={id}
                href="#"
                className={className}
              >
                <a href="#" onClick={e => onLinkClick(e, id)}>
                  {capitalize(title)}
                </a>
                <div className={style.arrowTable} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
