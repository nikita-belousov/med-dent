import _ from 'lodash'
import React from 'react'
import Container from './../Container'
import styles from './../../styles/components/pages/NarrowPage.css'

const NarrowPage = ({
  heading,
  caption,
  children,
  squeeze
}) => (
  <Container>
    <div className={squeeze
      ? styles['wrapper--squeeze']
      : styles['wrapper']
    }>
      <div className={styles['heading']}>
        {_.upperFirst(heading)}
      </div>
      <div className={styles['caption']}>
        {caption || null}
      </div>
      <div className={styles['content']}>
        {children}
      </div>
    </div>
  </Container>
)

export default NarrowPage
