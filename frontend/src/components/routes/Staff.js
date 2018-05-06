import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import NarrowPage from './../pages/NarrowPage'
import Dentist from './../Dentist'
import { Pagination } from './../pagination'
import { Staff as api } from './../../agent'

const Staff = () => (
  <div>
    <Route
      exact
      path='/staff'
      render={() => <Redirect to='/staff/pages/1' />}
    />
    <Route
      exact
      path='/staff/pages/:num'
      render={({ match }) =>
        <NarrowPage heading='Наши врачи'>
          <Pagination
            api={api}
            path='staff'
            itemComponent={Dentist}
            pageToShow={parseInt(match.params.num)}
          />
        </NarrowPage>}
    />
  </div>
)

export default Staff
