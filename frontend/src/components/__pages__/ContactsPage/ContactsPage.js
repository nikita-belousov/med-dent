import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import FontAwesome from '@fortawesome/react-fontawesome'

import style from './ContactsPage.css'
import { Link } from '../../__basic__'
import { NarrowPage } from '../index'
import { YaMap } from '../../YaMap'


const mapStateToProps = state => ({ mediaQueries: state.common.mediaQueries })


let ContactsPage = ({ mediaQueries }) =>
  <NarrowPage heading='Контакты'>
    <YaMap small={mediaQueries.small}>
      <Sidebar small={mediaQueries.small} />
    </YaMap>
  </NarrowPage>


const Sidebar = ({ small }) => {
  const className = classNames({
    [style.sidebarWrapper]: true,
    [style.small]: small
  })

  return (
    <div className={className}>
      <div className={style.sidebar}>
        {!small && <div className={style.view} />}
        <div className={style.contacts}>
          <ContactField title='Телефон' icon={['fas', 'phone']}>
            <Link href="tel:+07-916-019-38-22" type='alt'>
              8 916 019-38-22
            </Link>
            <br/>
            <Link href="tel:+07-495-135-37-50" type='alt'>
              8 495 135-37-50
            </Link>
          </ContactField>

          <ContactField title='Адрес' icon={['fas', 'map-marker-alt']}>
            г. Домодедово, улица Кирова, дом 7, корпус 1
          </ContactField>

          <ContactField title='Часы работы' icon={['fas', 'clock']}>
            Пн — Вс с 9.00 до 20.00
          </ContactField>

          <ContactField title='E-mail' icon={['fas', 'at']}>
            <Link type='alt' href="mailto:med-dent.dom@mail.ru">
              med-dent.dom@mail.ru
            </Link>
          </ContactField>
        </div>
      </div>
    </div>
  )
}


const ContactField = ({ icon, title, children }) =>
  <div className={style.field}>
    <div title={title} className={style.fieldIcon}>
      <FontAwesome icon={icon} />
    </div>
    <div className={style.fieldContent}>
      {children}
    </div>
  </div>



ContactsPage = connect(mapStateToProps)(ContactsPage)

export { ContactsPage }
