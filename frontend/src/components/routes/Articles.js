import React, { Fragment }  from 'react'
import { Route, Redirect } from 'react-router-dom'

import { NarrowPage } from './../pages'
import ArticlePage from './../pages/ArticlePage'
import { Pagination } from './../pagination'
import { Preview } from './../article'

const Articles = ({ path, title, api }) => (
  <Fragment>
    <Route
      exact
      path={`/${path}`}
      render={() => <Redirect to={`/${path}/pages/1`} />}
    />
    <Route
      exact
      path={`/${path}/:slug`}
      render={({ match }) =>
        <ArticlePage
          api={api}
          slug={match.params.slug}
        />
      }
    />
    <Route
      exact
      path={`/${path}/pages/:num`}
      render={({ match }) =>
        <NarrowPage heading={title}>
          <Pagination
            api={api}
            path={path}
            itemComponent={Preview}

            pageToShow={parseInt(match.params.num)}
            sort='datePublished'
          />
        </NarrowPage>
      }
    />
  </Fragment>
)

export default Articles
