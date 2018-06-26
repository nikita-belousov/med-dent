import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'small-uuid'

import { fetchSpecialsSlides } from '../../../actions'
import styles from './SpecialsSlider.css'
import { Slider } from '../../Slider'
import { Section }  from '../../Section'
import { SpecialCard } from '../../SpecialCard'
import { NavArrow, Link, Container } from '../../__basic__'


const mapStateToProps = state => ({
  cards: state.specialsSlider.specialsCards,
  mediaQueries: state.common.mediaQueries
})

const mapDispatchToProps = { fetchSpecialsSlides }


let SpecialsSlider = class extends Component {
  componentWillMount() {
    this.props.fetchSpecialsSlides()
  }

  render() {
    const { cards, mediaQueries } = this.props

    if (!mediaQueries || (!cards || cards.length === 0)) {
      return null
    }

    return (
      <div className={styles.wrapper}>
        <Container responsive={true}>
          <h2 className={styles.caption}>
            Специальные предложения
          </h2>
          <div className={styles.sliderWrapper}>
            <Slider
              updateSlidesIn={mediaQueries.medium}
              slidesToShow={mediaQueries.medium ? 3 : 4}
              autoplay={true}
              controlsInside={true}
            >
              {cards.map(card => (
                <div key={card.slug}>
                  <SpecialCard small={mediaQueries.medium} {...card} />
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.moreAbout}>
            <Link href="/specials">
              Подробнее об акциях
            </Link>
          </div>
        </Container>
      </div>
    )
  }
}


SpecialsSlider = connect(mapStateToProps, mapDispatchToProps)(SpecialsSlider)

export { SpecialsSlider }
