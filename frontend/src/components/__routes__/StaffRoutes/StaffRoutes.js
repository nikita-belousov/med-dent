import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { fetchDentistsPage } from '../../../actions'
import { NarrowPage } from '../../__pages__'
import { Pagination } from '../../__pagination__'
import { Dentist }  from '../../Dentist'


export const StaffRoutes = () => (
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
            itemsOnPage={999}
            fetchData={fetchDentistsPage}
            path='staff'
            itemComponent={Dentist}
            pageToShow={parseInt(match.params.num)}
            gridView={true}
          />
        </NarrowPage>}
    />
  </div>
)
