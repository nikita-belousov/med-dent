import React, { Component } from 'react'
import utils from 'utils'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import style from './Article.css'
import { Paragraph } from '../../__basic__'
import { YaShare } from '../../YaShare'


const mapStateToProps = state => ({ ...state.articlePage })


let Article = class extends Component {
  componentWillMount() {
    const { dispatch, fetchData, slug  } = this.props
    dispatch(fetchData(slug))
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


Article = connect(mapStateToProps)(Article)

export { Article }
