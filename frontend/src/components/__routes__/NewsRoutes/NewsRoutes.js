import React from 'react'
import { ArticlesRoutes } from '../index'
import { News as api } from '../../../agent'


export const NewsRoutes = () => (
  <ArticlesRoutes
    path='news'
    api={api}
    title='Новости'
  />
)
