import React from 'react'
import styles from './../../styles/components/sections/Footer.css'
import uuid from 'small-uuid'
import FontAwesome from 'react-fontawesome'

import Link from './../common/Link'
import Container from './../Container'
import { FOOTER_LINKS } from './../../constants/config'


const Footer = () => (
  <div className={styles['wrapper']}>
    <Container>
      <div className={styles['footer']}>
        <div className={styles['inner']}>
          <ul className={styles['links']}>
            {FOOTER_LINKS.map(link => (
              <li key={uuid.create()}>
                <Link type='alt' href={link.path}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles['copyright']}>
        © Стоматология «Мед-Дент», 2011–2016
      </div>
    </Container>
  </div>
)


export default Footer
