import React from 'react'
import { ArticlesRoutes } from '../index'
import { fetchSpecialsPage, fetchSpecialArticle } from '../../../actions'

export const SpecialsRoutes = () =>
  <ArticlesRoutes
    path='specials'
    fetchArticle={fetchSpecialArticle}
    fetchPage={fetchSpecialsPage}
    title='Акции'
  />
