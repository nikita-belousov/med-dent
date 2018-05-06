import React from 'react'
import { Paragraph } from './common'
import PositionLabel from './common/PositionLabel'
import styles from './../styles/components/Dentist.css'

const Dentist = ({ imageFolder, name, about, positions, experience }) => {
  let thumbSrc
  if (imageFolder) {
    thumbSrc = require(`./../assets/images/staff/${imageFolder}/thumb.png`)
  }

  return (
    <div className={styles['dentist']}>
      <div className={styles['aside']}>
        <div
          className={styles['photo']}
          style={{ backgroundImage: thumbSrc ? `url(${thumbSrc})` : 'grey' }}
        />
      </div>
      <div className={styles['content']}>
        <div className={styles['main-info']}>
          <div className={styles['name']}>
            {name}
          </div>
          <div className={styles['positions-list']}>
            {positions.map(position =>
              <div
                key={position}
                className={styles['label-wrapper']}
              >
                <PositionLabel>
                  {position}
                </PositionLabel>
              </div>
            )}
          </div>
          <div className={styles['experience']}>
            {`Стаж ${experience}`}
          </div>
        </div>
        <div className={styles['description']}>
          <Paragraph>
            {about}
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default Dentist
