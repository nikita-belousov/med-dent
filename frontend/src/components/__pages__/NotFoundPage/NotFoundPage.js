import React, { Component } from 'react'
import { NarrowPage } from '../index'
import { Paragraph } from '../../__basic__'


export const NotFoundPage = () => (
  <NarrowPage
    squeeze
    heading='страница не найдена'
  >
    <Paragraph>Страница по вашему запросу не найдена.</Paragraph>
  </NarrowPage>
)
