import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './../../styles/components/sections/NewsSlider.css'
import { formatDate } from 'utils'

import FontAwesome from 'react-fontawesome'
import Container from './../Container'
import { Slider } from '../Slider'
import NavArrow from './../common/NavArrow'
import Paragraph from './../common/Paragraph'
import Link from './../common/Link'
import { PreviewPicture } from './../article'

import { News as api } from './../../agent'

import {
  NEWS_SLIDER_LOADED,
  NEWS_SLIDER_UNLOADED
} from './../../constants/actionTypes'

const Dummy = ({ children }) => <div>{children}</div>

const mapStateToProps = state => ({
  news: state.newsSlider.news
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: NEWS_SLIDER_LOADED, payload }),
  onUnload: () => {
    dispatch({ type: NEWS_SLIDER_UNLOADED })
  }
})

class NewsSlider extends Component {
  componentWillMount() {
    this.props.onLoad(api.all())
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  renderSlider(news) {
    return (
      <Slider autoplay={false} slidesToShow={3}>
        {news.map(doc => (
          <div key={doc.slug} className={styles['news-entity']}>
            <div className={styles['preview']}>
              <Link href={`/news/${doc.slug}`}>
                <PreviewPicture
                  src={require('./../../assets/images/' + doc.thumbnail)}
                />
              </Link>
            </div>
            <div className={styles['content']}>
              <Link href={`/news/${doc.slug}`}>
                {doc.title}
              </Link>
              <div className={styles['bottom-line']}>
                <div className={styles['data']}>
                  {formatDate(doc.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    )
  }

  render() {
    const { news } = this.props

    if (!news || news.length === 0) {
      return null
    }

    return (
      <div className={styles['section-wrapper']}>
        <Container>
          <div>
            <h3>Новости</h3>
            {this.renderSlider(news)}
          </div>
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSlider)
