import React from 'react'
import { ArticlesRoutes } from '../index'
import { Specials as api } from '../../../agent'

export const SpecialsRoutes = () => (
  <ArticlesRoutes
    path='specials'
    api={api}
    title='Акции'
  />
)
