import React, { Component } from 'react'
import styles from './../../styles/components/PreviewPicture.css'

const PreviewPicture = ({ src }) => (
  <div
    style={{ backgroundImage: src ? `url(${src})` : null }}
    className={styles['preview-picture']}
  />
)

export default PreviewPicture
