import React from 'react'
import style from './Maintenance.css'
import { Paragraph, Link } from '../__basic__'

const Maintenance = () =>
  <div className={style.wrapper}>
    <Paragraph>
      Сайт находится на техосблуживании. Заходите на наш
      {' '}
      <Link href='http://www.meddent.su'>старый сайт</Link>.
    </Paragraph>
  </div>


export { Maintenance }
