import React from 'react'
import { SPECIALS } from '../../../constants/linksStructure'
import { Breadcrumbs } from '../../__containers__'
import { ArticlesRoutes } from '../index'
import { fetchSpecialsPage, fetchSpecialsArticle } from '../../../actions'


export const SpecialsRoutes = () =>
  <ArticlesRoutes
    path='specials'
    fetchArticle={fetchSpecialsArticle}
    fetchPage={fetchSpecialsPage}
    title='Акции'
    category={SPECIALS}
  />
