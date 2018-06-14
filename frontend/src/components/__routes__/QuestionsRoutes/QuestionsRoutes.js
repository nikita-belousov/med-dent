import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { fetchQuestionsPage } from '../../../actions'
import { QuestionsPage } from '../../__pages__'
import { Pagination } from '../../__pagination__'
import { Question }  from '../../Question'
import { Questions as api } from '../../../agent'


export const QuestionsRoutes = () => (
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
            fetchData={fetchQuestionsPage}
            path='questions'
            itemComponent={Question}
            pageToShow={parseInt(match.params.num)}
          />
        </QuestionsPage>}
    />
  </div>
)
