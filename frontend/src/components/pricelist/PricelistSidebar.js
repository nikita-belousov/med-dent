import React, { Component } from 'react'
import _ from 'lodash'
import styles from './../../styles/components/pages/Pricelist.css'

class PricelistSidebar extends Component {
  render() {
    const {
      links,
      active,
      onLinkClick,
    } = this.props

    return (
      <div className={styles['nav-bar']}>
        <ul>
          {links.map(({ title, id }) => {
            const isActive = active === id
            const className = isActive
              ? styles['nav-bar-link--active']
              : styles['nav-bar-link']

            return (
              <li
                key={id}
                href="#"
                className={className}
              >
                <a href="#" onClick={e => onLinkClick(e, id)}>
                  {_.capitalize(title)}
                </a>
                <div className={styles['arrow-tale']} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default PricelistSidebar
