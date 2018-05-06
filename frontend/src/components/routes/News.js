import React from 'react'
import { Articles } from './index'
import { News as api } from './../../agent'

const News = () => (
  <Articles
    path='news'
    api={api}
    title='Новости'
  />
)

export default News
