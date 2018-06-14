import React from 'react'
import { ArticlesRoutes } from '../index'
import { fetchNewsPage, fetchNewsArticle } from '../../../actions'

export const NewsRoutes = () =>
  <ArticlesRoutes
    path='news'
    fetchArticle={fetchNewsArticle}
    fetchPage={fetchNewsPage}
    title='Новости'
  />
