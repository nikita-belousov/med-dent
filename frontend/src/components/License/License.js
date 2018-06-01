import React from 'react'
import FontAwesome from 'react-fontawesome'
import style from './License.css'


const LICENSE = {
  file: require('../../assets/docs/license.pdf'),
  title: `Лицензия на осуществление медицинской деятельности ООО «Мед-Дент»`,
  size: '5 MB'
}

export const License = () =>
  <div className={style.wrapper}>
    <div className={style.license}>
      <div className={style.icon}>
        <LicenseLink>
          <FontAwesome name="file" />
        </LicenseLink>
      </div>
      <div className={style.title}>
        <LicenseLink>{LICENSE.title}</LicenseLink>
        <div className={style.size}>
          {LICENSE.size}
        </div>
      </div>
    </div>
  </div>

const LicenseLink = ({ children }) =>
  <a
    href={LICENSE.file}
    title="Лицензия"
    target="_blank"
  >
    {children}
  </a>
