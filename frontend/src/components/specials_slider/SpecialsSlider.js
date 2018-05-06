import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'small-uuid'
import Slider from 'react-slick'

import styles from './../../styles/components/sections/SpecialsSlider.css'
import Section from './../Section'
import Container from './../Container'
import { SpecialCard } from './index'
import { NavArrow, Link } from './../common'

import { Specials as api } from './../../agent'

import {
  SPECIALS_SLIDER_LOADED,
  SPECIALS_SLIDER_UNLOADED
} from './../../constants/actionTypes'

const mapStateToProps = state => ({
  cards: state.specialsSlider.cards
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => {
    dispatch({ type: SPECIALS_SLIDER_LOADED, payload })
  },
  onUnload: () => {
    dispatch({ type: SPECIALS_SLIDER_UNLOADED })
  }
})

class SpecialsSlider extends Component {
  settings = {
    slidesToShow: 4,
    infinite: true,
    speed: 500,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <NavArrow wrapperClass={styles['prev-arrow-wrapper']} type="prev" />,
    nextArrow: <NavArrow wrapperClass={styles['next-arrow-wrapper']} type="next" />
  }

  componentWillMount() {
    this.props.onLoad(api.cards())
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  renderSlider(card) {
    return (
      <Slider {...this.settings}>
        {card.map(card => (
          <div key={card.slug}>
            <SpecialCard {...card} />
          </div>
        ))}
      </Slider>
    )
  }

  render() {
    const { cards } = this.props

    if (!cards || cards.length === 0) {
      return null
    }

    return (
      <div className={styles['wrapper']}>
        <Container>
          <h2 className={styles['caption']}>
            Специальные предложения
          </h2>
          <div className={styles['slider-wrapper']}>
            {this.renderSlider(cards)}
          </div>
          <div className={styles["more-about"]}>
            <Link href="/specials">
              Подробнее об акциях
            </Link>
          </div>
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialsSlider)
