import React from 'react'
import styles from './../../styles/components/sections/Footer.css'
import Link from './../common/Link'
import Container from './../Container'
import uuid from 'small-uuid'
import FontAwesome from 'react-fontawesome'

const Links = [
  {
    title: 'Для слабослышащих',
    path: '#'
  },
  {
    title: 'Вакансии',
    path: '#'
  },
  {
    title: 'Лицензии',
    path: '#'
  },
  {
    title: 'Поставщикам',
    path: '#'
  },
  {
    title: 'Карта сайта',
    path: '#'
  }
]

const Footer = (props) => (
  <div className={styles['wrapper']}>
    <Container>
      <div className={styles['footer']}>
        <div className={styles['inner']}>
          <ul className={styles['links']}>
            {Links.map(link => (
              <li key={uuid.create()}>
                <Link type='alt' href={link.path}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles['socials']}>
            <Link type='alt' href="https://vk.com/meddent_dmd">
              <FontAwesome name='vk' />
            </Link>
            <Link type='alt' href="https://www.instagram.com/meddentdmd/">
              <FontAwesome name='instagram' />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles['copyright']}>
        © Стоматология «Мед-Дент», 2011–2016
      </div>
    </Container>
  </div>
)

export default Footer
