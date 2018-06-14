import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { fetchReviewsPage } from '../../../actions'
import { ReviewsPage } from '../../__pages__'
import { Pagination } from '../../__pagination__'
import { Review }  from '../../Review'
import { Reviews as api } from '../../../agent'


export const ReviewsRoutes = () =>
  <Fragment>
    <Route
      exact
      path='/reviews'
      render={() => <Redirect to='/reviews/pages/1' />}
    />
    <Route
      exact
      path='/reviews/pages/:num'
      render={({ match }) =>
        <ReviewsPage>
          <Pagination
            fetchData={fetchReviewsPage}
            path='reviews'
            itemComponent={Review}
            pageToShow={parseInt(match.params.num)}
          />
        </ReviewsPage>}
    />
  </Fragment>
