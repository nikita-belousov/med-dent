import React, { Component } from 'react'
import styles from './../../styles/components/pages/Contacts.css'
import NarrowPage from './NarrowPage'
import Link from '../common/Link'
import Paragraph from '../common/Paragraph'

class Contacts extends Component {
  render() {
    return (
      <NarrowPage heading='Контакты' >
        <div className={styles['contact-group']}>
          <div className={styles['method']}>
            <div className={styles['capture']}>
              Телефоны
            </div>
            <div className={styles['phones']}>
              <div className={styles['number']}>
                8 496 797 83 06
              </div>
              <div className={styles['number']}>
                8 916 019 38 22
              </div>
            </div>
          </div>
          <div className={styles['method']}>
            <div className={styles['capture']}>
              Электронная почта
            </div>
            <div className={styles['email']}>
              <Link>
                meddent@meddent.su
              </Link>
            </div>
          </div>
          <div className={styles['method']}>
            <div className={styles['capture']}>
              Часы работы
            </div>
            <div className={styles['schedule']}>
              <div className={styles['time']}>
                Пн—Вс с 9:00 до 20:00
              </div>
              <div className={styles['addition']}>
                <Paragraph>
                  Без перерыва и выходных
                </Paragraph>
              </div>
            </div>
          </div>
          <div className={styles['method']}>
            <div className={styles['capture']}>
              Адрес
            </div>
            <div className={styles['address']}>
              г. Домодедово, ул. Кирова, д. 7, корп. 1
            </div>
          </div>
          <div className={styles['map-frame']}>
            <iframe src="https://yandex.ru/map-widget/v1/-/CBeKZ-XBgC" frameBorder='0' />
          </div>
        </div>
      </NarrowPage>
    )
  }
}
export default Contacts
