import React from 'react'
import { connect } from 'react-redux'
import { NarrowPage } from '../index'
import { Article } from '../../__article__'


const mapStateToProps = state => ({
  title: state.articlePage.title
})

let ArticlePage = ({ api, slug, title }) => (
  <NarrowPage
    squeeze={true}
    heading={title}
  >
    <Article
      api={api}
      slug={slug}
    />
  </NarrowPage>
)

ArticlePage = connect(mapStateToProps, null)(ArticlePage)
export { ArticlePage }
