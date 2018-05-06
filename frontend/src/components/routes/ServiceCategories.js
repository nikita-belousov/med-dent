import React from 'react'
import { Route } from 'react-router-dom'

import * as pages from './../pages'

export default () => (
  <div>
    <Route
      exact path='/implantaciya'
      component={pages.Implantology}
    />
    <Route
      exact path='/ortopediya'
      component={pages.Orthopedics}
    />
    <Route
      exact path='/terapiya'
      component={pages.Therapy}
    />
    <Route
      exact path='/gigiena'
      component={pages.Hygiene}
    />
    <Route
      exact path='/ortodontiya'
      component={pages.Orthodontics}
    />
    <Route
      exact path='/hirurgiya'
      component={pages.Surgery}
    />
    <Route
      exact path='/detskaya-stomatologiya'
      component={pages.ChildStomatology}
    />
  </div>
)
