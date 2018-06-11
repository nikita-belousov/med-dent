import React, { Component } from 'react'
import times from 'lodash/times'
import styles from './PaginationControls.css'
import { NavLink } from '../../__basic__'


export const PaginationControls = ({ path, totalPages, pageToShow }) =>
  <div className={styles.nav}>
    <div className={styles.linksInner}>
      {(pageToShow > 1) &&
        <div className={styles.prev}>
          <NavLink to={`/${path}/pages/${pageToShow - 1}`}>
            ←
          </NavLink>
        </div>}

      {times(totalPages).map(num =>
        <div key={num}>
          <div className={styles.navLink}>
            <NavLink to={`/${path}/pages/${num + 1}`}>
              {num + 1}
            </NavLink>
          </div>
        </div>)}

      {(pageToShow < totalPages) &&
        <div className={styles.next}>
          <NavLink to={`/${path}/pages/${pageToShow + 1}`}>
            →
          </NavLink>
        </div>}
    </div>
  </div>
