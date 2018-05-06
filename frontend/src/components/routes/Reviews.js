import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import ReviewsPage from './../pages/ReviewsPage'
import Review from './../Review'
import { Pagination } from './../pagination'
import { Reviews as api } from './../../agent'

const Reviews = () => (
  <div>
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
            api={api}
            path='reviews'
            itemComponent={Review}
            pageToShow={parseInt(match.params.num)}
          />
        </ReviewsPage>}
    />
  </div>
)

export default Reviews
