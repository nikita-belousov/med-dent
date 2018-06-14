import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formatDate } from 'utils'
import FontAwesome from 'react-fontawesome'

import { fetchNewsSlides } from '../../../actions'
import styles from './NewsSlider.css'
import { Container, NavArrow, Paragraph, Link } from '../../__basic__'
import { ArticleThumbnail } from '../../__article__'
import { Slider } from '../../Slider'


const mapStateToProps = state => ({ news: state.newsSlider.news })

const mapDispatchToProps = { fetchNewsSlides }


let NewsSlider = class extends Component {
  componentWillMount() {
    this.props.fetchNewsSlides()
  }

  renderSlider(news) {
    return (
      <Slider autoplay={false} slidesToShow={3}>
        {news.map(doc => (
          <div key={doc.slug} className={styles.newsEntity}>
            <div className={styles.preview}>
              <Link href={`/news/${doc.slug}`}>
                <ArticleThumbnail
                  src={require('../../../assets/images/' + doc.thumbnail)}
                />
              </Link>
            </div>
            <div className={styles.content}>
              <Link href={`/news/${doc.slug}`}>
                {doc.title}
              </Link>
              <div className={styles.bottomLine}>
                <div className={styles.data}>
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
      <div className={styles.sectionWrapper}>
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


NewsSlider = connect(mapStateToProps, mapDispatchToProps)(NewsSlider)
export { NewsSlider }
