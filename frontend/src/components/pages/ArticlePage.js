import React from 'react'
import { connect } from 'react-redux'
import { NarrowPage } from './../pages'
import { Article } from './../article'

const mapStateToProps = state => ({
  title: state.articlePage.title
})

const ArticlePage = ({ api, slug, title }) => (
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

export default connect(mapStateToProps, null)(ArticlePage)
