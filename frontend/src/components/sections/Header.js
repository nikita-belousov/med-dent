import React, { Component } from 'react'
import NavLink from '../common/NavLink'
import styles from './../../styles/components/sections/Header.css'

const navLinks = [
  {
    title: 'О нас',
    path: '/about-us'
  },
  {
    title: 'Прайслист',
    path: '/pricelist'
  },
  {
    title: 'Акции',
    path: '/specials'
  },
  {
    title: 'Новости',
    path: '/news'
  },
  {
    title: 'Врачи',
    path: '/staff'
  },
  {
    title: 'Контакты',
    path: '/contacts'
  },
  {
    title: 'Вопросы',
    path: '/questions'
  },
  {
    title: 'Отзывы',
    path: '/reviews'
  }
]

class Header extends Component {
  renderNavLink({ title, path }) {
    return (
      <li
        key={title}
        onClick={() => window.location.reload()}
      >
        <NavLink to={path}>
          {title}
        </NavLink>
      </li>
    )
  }

  render() {
    return (
      <div className={styles['wrapper']}>
        <div className={styles['top-bar']}>
          <a href="/">
            <div className={styles['logo']} />
          </a>
          <div className={styles['navigation']}>
            <ul>
              {navLinks.map(link => this.renderNavLink(link))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
