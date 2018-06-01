import fs from 'fs'
import React from 'react'
import style from './PaymentMethods.css'


export const PaymentMethods = () =>
  <div className={style.wrapper}>
    <div className={style.capture}>
      Принимаем к оплате
    </div>
    <ul className={style.methods}>
      {PAYMENT_METHODS.map(({ title, icon }) =>
        <li key={title}>
          <div
            className={style.methodIcon}
            style={{ backgroundImage:
              `url(${require(`../../assets/images/payment-methods/${icon}`)})` }}
            title={title}
          />
        </li>
      )}
    </ul>
  </div>


const iconsPath = ''

const PAYMENT_METHODS = [
  {
    title: 'Mastercard',
    icon: 'mastercard.png'
  },
  {
    title: 'Visa',
    icon: 'visa.png'
  },
  {
    title: 'Maestro',
    icon: 'maestro.png'
  },
  {
    title: 'Visa Electron',
    icon: 'visa-electron.png'
  }
]
