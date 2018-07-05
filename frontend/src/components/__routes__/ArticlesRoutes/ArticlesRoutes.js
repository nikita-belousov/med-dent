import React, { Fragment }  from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { ITEMS_ON_PAGE } from '../../../constants'
import { Breadcrumbs } from '../../__containers__'
import { ArticlePage, NarrowPage } from '../../__pages__'
import { Pagination } from '../../__pagination__'
import { ArticlePreview } from '../../__article__'


const mapStateToProps = state => ({ mediaQueries: state.common.mediaQueries })


let ArticlesRoutes = ({ mediaQueries, path, title, fetchPage, fetchArticle, category }) =>
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
        <Breadcrumbs parentLink={category}>
          <ArticlePage
            fetchData={fetchArticle}
            slug={match.params.slug}
          />
        </Breadcrumbs>
      }
    />
    <Route
      exact
      path={`/${path}/pages/:num`}
      render={({ match }) =>
        <NarrowPage squeeze={!mediaQueries.medium} heading={title}>
          <Pagination
            fetchData={fetchPage}
            path={path}
            itemsOnPage={ITEMS_ON_PAGE}
            itemComponent={ArticlePreview}
            pageToShow={parseInt(match.params.num)}
            sort='datePublished'
          />
        </NarrowPage>}
    />
  </Fragment>


ArticlesRoutes = connect(mapStateToProps)(ArticlesRoutes)

export { ArticlesRoutes }
