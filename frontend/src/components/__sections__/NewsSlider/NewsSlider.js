import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formatDate } from 'utils'
import FontAwesome from 'react-fontawesome'

import { fetchNewsSlides } from '../../../actions'
import style from './NewsSlider.css'
import { Container, NavArrow, Paragraph, Link } from '../../__basic__'
import { ArticleThumbnail } from '../../__article__'
import { Slider } from '../../Slider'


const mapStateToProps = state => ({
  mediaQueries: state.common.mediaQueries,
  news: state.newsSlider.news
})

const mapDispatchToProps = { fetchNewsSlides }


const Slide = ({ mobile, title, slug, preview, thumbnail, content, createdAt }) => {
  const wrappperClass = classNames({
    [style.wrapper]: true,
    [style.mobile]: mobile
  })

  return (
    <div key={slug} className={wrappperClass}>
      {!mobile &&
        <div className={style.preview}>
          <Link href={`/news/${slug}`}>
            <ArticleThumbnail src={require('../../../assets/images/' + thumbnail)} />
          </Link>
        </div>}

        <div className={style.content}>
          <Link href={`/news/${slug}`}>
          {title}
        </Link>
        <div className={style.bottomLine}>
          <div className={style.data}>
            {formatDate(createdAt)}
          </div>
        </div>
      </div>
    </div>
  )
}


let NewsSlider = class extends Component {
  componentWillMount() {
    this.props.fetchNewsSlides()
  }

  render() {
    const { mediaQueries, news } = this.props

    if (!mediaQueries || (!news || news.length === 0)) {
      return null
    }

    return (
      <div className={style.sectionWrapper}>
        <Container responsive={true}>
          <div>
            <h3>Новости</h3>
            <Slider
              spaceAround={mediaQueries.small}
              controlsInside={true}
              controlsOnWindowEdge={true}
              slidesToShow={(mediaQueries.xsmall || mediaQueries.small) ? 1 : mediaQueries.medium ? 2 : 3}
              updateSlidesIn={mediaQueries}
            >
              {news.map((doc, i) =>
                <div className={style.slideWrapper} key={i}>
                  <Slide
                    mobile={mediaQueries.xsmall || (mediaQueries.medium && !mediaQueries.small)}
                    {...doc}
                  />
                </div>
              )}
            </Slider>
          </div>
        </Container>
      </div>
    )
  }
}


NewsSlider = connect(mapStateToProps, mapDispatchToProps)(NewsSlider)

export { NewsSlider }
