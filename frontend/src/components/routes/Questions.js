import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import QuestionsPage from './../pages/QuestionsPage'
import Question from './../Question'
import { Pagination } from './../pagination'
import { Questions as api } from './../../agent'

const Questions = () => (
  <div>
    <Route
      exact
      path='/questions'
      render={() => <Redirect to='/questions/pages/1' />}
    />
    <Route
      exact
      path='/questions/pages/:num'
      render={({ match }) =>
        <QuestionsPage>
          <Pagination
            api={api}
            path='questions'
            itemComponent={Question}
            pageToShow={parseInt(match.params.num)}
          />
        </QuestionsPage>}
    />
  </div>
)

export default Questions
