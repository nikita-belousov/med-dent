import React, { Component } from 'react'
import NarrowPage from './../pages/NarrowPage'
import Paragraph from './../common/Paragraph'

const NotFound = () => (
  <NarrowPage
    squeeze
    heading='страница не найдена'
  >
    <Paragraph>Страница по вашему запросу не найдена.</Paragraph>
  </NarrowPage>
)

export default NotFound
