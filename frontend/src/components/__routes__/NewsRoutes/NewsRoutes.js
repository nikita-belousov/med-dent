import React from 'react'
import { ArticlesRoutes } from '../index'
import { fetchNewsPage, fetchNewsArticle } from '../../../actions'
import { NEWS } from '../../../constants/linksStructure'


export const NewsRoutes = () =>
  <ArticlesRoutes
    path='news'
    fetchArticle={fetchNewsArticle}
    fetchPage={fetchNewsPage}
    title='Новости'
    parentLink={NEWS}
  />
