import React, { Fragment }  from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ArticlePage, NarrowPage } from '../../__pages__'
import { Pagination } from '../../__pagination__'
import { ArticlePreview } from '../../__article__'


export const ArticlesRoutes = ({ path, title, api }) => (
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
            itemComponent={ArticlePreview}
            pageToShow={parseInt(match.params.num)}
            sort='datePublished'
          />
        </NarrowPage>
      }
    />
  </Fragment>
)
