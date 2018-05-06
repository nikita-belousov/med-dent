import React, { Component } from 'react'
import _ from 'lodash'
import styles from './../../styles/components/pagination/Controls.css'
import { NavLink } from './../common'

const Controls = ({ path, totalPages, pageToShow }) => (
  <div className={styles['nav']}>
    <div className={styles['links-inner']}>
      {(pageToShow > 1) &&
        <div className={styles['prev']}>
          <NavLink to={`/${path}/pages/${pageToShow - 1}`}>
            ←
          </NavLink>
        </div>}
      {_.times(totalPages).map(num =>
        <div key={num}>
          <div className={styles['nav-link']}>
            <NavLink to={`/${path}/pages/${num + 1}`}>
              {num + 1}
            </NavLink>
          </div>
        </div>)}
      {(pageToShow < totalPages) &&
        <div className={styles['next']}>
          <NavLink to={`/${path}/pages/${pageToShow + 1}`}>
            →
          </NavLink>
        </div>}
    </div>
  </div>
)

export default Controls
