import React, { Fragment }  from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ITEMS_ON_PAGE } from '../../../constants'
import { ArticlePage, NarrowPage } from '../../__pages__'
import { Pagination } from '../../__pagination__'
import { ArticlePreview } from '../../__article__'


export const ArticlesRoutes = ({ path, title, fetchPage, fetchArticle }) =>
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
          fetchData={fetchArticle}
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
            fetchData={fetchPage}
            path={path}
            itemsOnPage={ITEMS_ON_PAGE}
            itemComponent={ArticlePreview}
            pageToShow={parseInt(match.params.num)}
            sort='datePublished'
          />
        </NarrowPage>
      }
    />
  </Fragment>
