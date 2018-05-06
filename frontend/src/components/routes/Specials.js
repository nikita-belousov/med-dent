import React from 'react'
import { Articles } from './index'
import { Specials as api } from './../../agent'

const Specials = () => (
  <Articles
    path='specials'
    api={api}
    title='Акции'
  />
)

export default Specials
