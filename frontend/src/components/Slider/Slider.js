import { fromEvent, interval } from 'rxjs'
import { debounceTime, throttleTime, startWith, map, filter, withLatestFrom, take, tap } from 'rxjs/operators'

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import times from 'lodash/times'
import style from './Slider.css'


export class Slider extends Component {
  static propTypes = {
    slidesToShow: PropTypes.number,
    autoplay: PropTypes.bool,
    controlsInside: PropTypes.bool,
    caption: PropTypes.string,
    spaceAround: PropTypes.bool
  }

  static defaultProps = {
    slidesToShow: 1,
    autoplay: true,
    controlsInside: false,
    spaceAround: false
  }

  OPERATIONS = ['previous', 'next']
  STEP_ANIMATION_TIME = 600
  FADE_IN_DELAY = 225
  AUTOPLAY_INTERVAL = 4000

  state = {
    slidesReady: false,
    controlsReady: false,
    marginsReady: false,
    appearanceReady: false,
    ready: false,
    offset: 0
  }

  constructor(props) {
    super(props)

    this.unsubscribe = []
    this.slides = []
    this.originalSlidesCount = null
    this.totalSlidesCount = null
    this.slideWidth = null
    this.slideMargin = null
    this.sliderNode = null
    this.slideNode = null
    this.initialRender = true
  }

  componentDidMount() {
    this.init()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.initLightbox && this.state.ready) {
      this.props.initLightbox()
    }

    const updateSlides = prevProps.updateSlidesIn !== this.props.updateSlidesIn
    this.init(updateSlides)
  }

  componentWillUnmount() {
    clearInterval(this.autoplayInterval)
    this.unsubscribe.forEach(obs => obs.unsubscribe())
  }

  init(updateSlides) {
    // this.initAppearance()

    if (!this.state.marginsReady && (this.slideNode && this.sliderNode)) {
      this.initResize()
    }

    const childrenLength = React.Children.count(this.props.children)
    if ((this.originalSlidesCount !== childrenLength) ||
         updateSlides) {
      this.initSlides()
    }

    this.initControls()
    this.tryReady()
  }

  initAppearance() {
    if (!this.sliderNode || this.state.appearanceReady) {
      return
    }

    const breakpoint = window.innerHeight / 2

    const onReady = () => this.setState(prev => ({
      ...prev,
      appearanceReady: true
    }))

    this.scroll$ = fromEvent(window, 'scroll')
      .pipe(
        startWith(0),
        map(() => this.sliderNode.getBoundingClientRect().top),
        filter(val => val < breakpoint),
        take(1)
      )
      .subscribe(onReady)
  }

  initSlides() {
    const { children } = this.props

    this.originalSlidesCount = React.Children.count(children)
    this.totalSlidesCount = this.originalSlidesCount * 3

    const originalSlides = React.Children.toArray(children)
    const slides = [ ...originalSlides, ...originalSlides, ...originalSlides ]

    this.slides = this.provideRef(slides)
      .map((slide, i) => ({ slide, key: 1000 + i }))

    this.setState(prev => ({
      ...prev,
      slidesReady: true
    }))
  }

  recalculateMargins = () => {
    const { slidesToShow, spaceAround } = this.props
    const containerWidth = this.sliderNode.parentElement.offsetWidth

    this.slideWidth = this.slideNode.offsetWidth
    let offset

    if (!spaceAround && slidesToShow > 1) {
      this.slideMargin = (containerWidth - this.slideWidth * slidesToShow) / (slidesToShow - 1)
      offset = -1 * ((this.slideWidth * this.originalSlidesCount)
        + (this.slideMargin * this.originalSlidesCount))
    } else if (spaceAround || slidesToShow === 1) {
      this.slideMargin = (containerWidth - this.slideWidth * slidesToShow) / (slidesToShow * 2)
      offset = -1 * ((this.slideWidth * this.originalSlidesCount)
        + (this.slideMargin * this.originalSlidesCount * 2))
    }

    this._step = this.slideWidth + this.slideMargin

    this.setState(prev => ({
      ...prev,
      offset,
      marginsReady: true
    }))
  }

  initControls() {
    if (this.state.controlsReady || !(this.previousNode && this.nextNode)) {
      return
    }

    const previous$ = fromEvent(this.previousNode, 'click')
      .pipe(
        throttleTime(this.STEP_ANIMATION_TIME)
      ).subscribe(this.onPrevious)

    const next$ = fromEvent(this.nextNode, 'click')
      .pipe(
        throttleTime(this.STEP_ANIMATION_TIME)
      ).subscribe(this.onNext)

    this.setState(prev => ({
      ...prev,
      controlsReady: true
    }))

    this.unsubscribe.push(previous$, next$)
  }

  initAutoplay() {
    const next = () => this.updateSlider('next', 1)

    const mouseover$ = fromEvent(window.document, 'mouseover')
      .pipe(startWith({ clientX: 0, clientY: 0 }))

    const autoplay$ = interval(this.AUTOPLAY_INTERVAL)
      .pipe(
        withLatestFrom(mouseover$),
        map(values => ({
          x: values[1].clientX,
          y: values[1].clientY
        })),
        filter(val => !this.isHovering(val.x, val.y))
      ).subscribe(next)

    this.unsubscribe.push(autoplay$)
  }

  initResize = () => {
    this.recalculateMargins()

    const resize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(this.recalculateMargins)

    this.unsubscribe.push(resize$)
  }

  tryReady() {
    const {
      ready,
      slidesReady,
      marginsReady,
      controlsReady,
      appearanceReady
    } = this.state

    if (ready ||
        !(slidesReady && marginsReady && controlsReady)) {
      return
    }

    this.setState(prev => ({
      ...prev,
      ready: true
    }), () => this.onReady())
  }

  onReady() {
    this.initialRender = false
    // this.scroll$.unsubscribe()

    const { autoplay, initLightbox } = this.props

    if (autoplay) this.initAutoplay()
    if (initLightbox) initLightbox()
  }

  isHovering = (x, y) => {
    const { top, bottom, left, right } = this.sliderNode.getBoundingClientRect()
    return ((x >= left && x <= right) && (y >= top && y <= bottom))
  }

  provideRef(slides) {
    let withRef, other

    // expects to get an array, not children collection
    const res = slides.slice()

    res[0] = React.cloneElement(res[0], {
      ref: node => this.slideNode = node
    })

    return res
  }

  onPrevious = () => {
    this.updateSlider('previous', 1)
  }

  onNext = () => {
    this.updateSlider('next', 1)
  }

  updateSlider(operation, quantity) {
    this.checkOperationValidity(operation)

    if (operation === 'previous') {
      this.updateSlidesArray(operation, quantity)
      this.animate(operation, quantity)
      setTimeout(this.resetAnimation.bind(this), this.STEP_ANIMATION_TIME)
    } else if (operation === 'next') {
      this.animate(operation, quantity)
      setTimeout(() => {
        this.updateSlidesArray(operation, quantity)
        this.resetAnimation()
      }, this.STEP_ANIMATION_TIME)
    }
  }

  updateSlidesArray(operation, quantity) {
    this.checkOperationValidity(operation)

    if (operation === 'previous') {
      this.slides = [
        ...this.slides.slice(-quantity),
        ...this.slides.slice(0, -quantity)
      ]
    } else if (operation === 'next') {
      this.slides = [
        ...this.slides.slice(quantity),
        ...this.slides.slice(0, quantity)
      ]
    }
  }

  animate(operation, quantity) {
    this.checkOperationValidity(operation)

    this.setState(prev => ({
      ...prev,
      animation: {
        type: operation === 'previous' ? 'add' : 'remove',
        quantity
      }
    }))
  }

  resetAnimation() {
    this.setState(prev => ({
      ...prev,
      animation: null
    }))
  }

  checkOperationValidity(operation) {
    if (!this.OPERATIONS.includes(operation)) {
      throw new Error('Unrecognized operation')
    }
  }

  onPreviousRef = node => {
    this.previousNode = node
  }

  onNextRef = node => {
    this.nextNode = node
  }

  render() {
    const { children, arrowsInside, caption, spaceAround } = this.props
    let fadeInSlides

    if (!children || children.length === 0) {
      return null
    }

    const { offset, ready, animation } = this.state

    if (ready && this.initialRender) {
      fadeInSlides = times(
        this.props.slidesToShow,
        i => i + this.originalSlidesCount
      )
    }

    const wrapperClass = classNames({
      [style.wrapper]: true,
      [style.ready]: ready,
      [style.controlsInside]: this.props.controlsInside
    })

    let isGroupReady = false
    const margin = this.slideMargin || 0

    return (
      <div className={style.container}>
        <div
          className={wrapperClass}
          ref={node => this.sliderNode = node}
        >
          <div className={style.scene}>
            <div
              className={style.slides}
              style={{ left: `${offset}px` }}
            >
              {this.slides.map(({ slide, key }, i) => {
                let element, groupedSlides

                if (groupedSlides && groupedSlides.includes(i)) {
                  return null
                }

                if (fadeInSlides && (fadeInSlides.includes(i))) {
                  const animationDelay =
                    (i - this.originalSlidesCount + 1) * this.FADE_IN_DELAY

                  return (
                    <CSSTransition
                      key={i}
                      in={true}
                      timeout={animationDelay}
                      appear={true}
                      classNames={{
                        appear: style.slideFadeIn,
                        enterDone: style.slide
                      }}
                    >
                      <Slide
                        key={key}
                        margin={margin}
                        spaceAround={spaceAround}
                      >
                        {slide}
                      </Slide>
                    </CSSTransition>
                  )
                } else if (animation && !isGroupReady) {
                  const { type, quantity } = animation
                  let groupContent = []

                  groupedSlides = times(quantity)

                  for (let i = 0; i < quantity; i++) {
                    groupContent.push(
                      <Slide
                        key={key}
                        margin={margin}
                        spaceAround={spaceAround}
                      >
                        {this.slides[i].slide}
                      </Slide>
                    )
                  }

                  isGroupReady = true
                  const groupSize = groupedSlides.length

                  let groupWidth
                  if (spaceAround) {
                    groupWidth = groupSize * (this.slideWidth + this.slideMargin * 2)
                  } else {
                    groupWidth = groupSize * (this.slideWidth + this.slideMargin)
                  }

                  return (
                    <TargetGroup
                      key={i}
                      remove={type === 'remove'}
                      add={type === 'add'}
                      width={groupWidth}
                    >
                      {groupContent}
                    </TargetGroup>
                  )
                }

                return (
                  <Slide
                    key={key}
                    margin={margin}
                    spaceAround={spaceAround}
                  >
                    {slide}
                  </Slide>
                )
              })}
            </div>
          </div>

          <Controls
            inside={arrowsInside}
            onPreviousRef={this.onPreviousRef}
            onNextRef={this.onNextRef}
          />
        </div>

        {caption &&
          <div className={style.caption}>
            {caption}
          </div>}
      </div>
    )
  }
}

class TargetGroup extends Component {
  render() {
    const { add, remove, children, width } = this.props

    const className = classNames({
      [style.addGroup]: add,
      [style.removeGroup]: remove
    })

    return (
      <div
        key={children[0].props.children.key}
        className={className}
        style={{ width }}
      >
        {children}
      </div>
    )
  }
}

const Slide = ({ children, spaceAround, margin }) => {
  const style = spaceAround
    ? { marginLeft: margin, marginRight: margin }
    : { marginRight: margin }

  return (
    <div style={style}>
      {children}
    </div>
  )
}

const Controls = ({ inside, onNextRef, onPreviousRef }) => {
  const previousClass = classNames({
    [style.previous]: true,
    [style.inside]: inside
  })

  const nextClass = classNames({
    [style.next]: true,
    [style.inside]: inside
  })

  const scrollbarOffset = (window.innerWidth - document.documentElement.clientWidth) / 2

  return (
    <Fragment>
      <button
        className={previousClass}
        ref={onPreviousRef}
        style={{ marginLeft: `${scrollbarOffset}px` }}
      >
        <span className={style.previousArrow}>
          <FontAwesome name="arrow-right" />
        </span>
      </button>
      <button
        className={nextClass}
        ref={onNextRef}
        style={{ marginRight: `${scrollbarOffset}px` }}
      >
        <span className={style.nextArrow}>
          <FontAwesome name="arrow-right" />
        </span>
      </button>
    </Fragment>
  )
}
