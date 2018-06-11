import React, { Component } from 'react'
import utils from 'utils'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import style from './Article.css'
import { Paragraph } from '../../__basic__'
import { YaShare } from '../../YaShare'

import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED
} from '../../../constants/actionTypes'

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

let Article = class extends Component {
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
      <div className={style.article}>
        <div className={style.caption}>
          <div className={style.date}>
            {utils.formatDate(createdAt)}
          </div>
          <div className={style.views}>
            <span className={style.eyeIcon}>
              <FontAwesome name='eye' />
            </span>
            {views}
          </div>
        </div>
        <div className={style.text}>
          <Paragraph>
            {text}
          </Paragraph>
        </div>
        <div className={style.shareButtons}>
          <div className={style.shareLabel}>
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

Article = connect(mapStateToProps, mapDispatchToProps)(Article)
export { Article }
