import React, { Component } from 'react'
import utils from 'utils'
import { connect } from 'react-redux'

import styles from './../../styles/components/Article.css'
import { Paragraph } from './../common'
import FontAwesome from 'react-fontawesome'
import YaShare from './../YaShare'

import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED
} from './../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.articlePage
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => {
    dispatch({ type: ARTICLE_PAGE_LOADED, payload })
  },
  onUnload: () => {
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
  }
})

class Article extends Component {
  componentWillMount() {
    const { slug, api, onLoad } = this.props
    onLoad(api.article(slug))
  }

  componentWillUpdate(nextProps) {
    const { slug, api, onLoad } = this.props
    if (nextProps.slug !== slug) {
      onLoad(api.article(nextProps.slug))
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    const { slug, createdAt, title, text, views } = this.props

    if (!this.props.title) {
      return null
    }

    return (
      <div className={styles['article']}>
        <div className={styles['caption']}>
          <div className={styles['date']}>
            {utils.formatDate(createdAt)}
          </div>
          <div className={styles['views']}>
            <span className={styles['eye-icon']}>
              <FontAwesome name='eye' />
            </span>
            {views}
          </div>
        </div>
        <div className={styles['text']}>
          <Paragraph>
            {text}
          </Paragraph>
        </div>
        <div className={styles['share-buttons']}>
          <div className={styles['share-label']}>
            Поделиться в соцсетях:
          </div>
          <YaShare
            contentUrl={window.location.href}
            title={title}
            description={text}
          />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
