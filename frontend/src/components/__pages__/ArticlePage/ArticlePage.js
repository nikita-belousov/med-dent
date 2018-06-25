import React from 'react'
import { connect } from 'react-redux'
import { NarrowPage } from '../index'
import { Article, ArticleCaption } from '../../__article__'


const mapStateToProps = ({ articlePage }) => ({
  title: articlePage.title,
  createdAt: articlePage.createdAt,
  views: articlePage.views
})


let ArticlePage = ({ slug, title, createdAt, views, fetchData }) =>
  <NarrowPage
    squeeze={true}
    heading={title}
    caption={createdAt &&
      <ArticleCaption createdAt={createdAt} views={views} />}
  >
    <Article
      fetchData={fetchData}
      slug={slug}
    />
  </NarrowPage>


ArticlePage = connect(mapStateToProps, null)(ArticlePage)

export { ArticlePage }
