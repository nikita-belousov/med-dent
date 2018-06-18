import React, { Component } from 'react'
import Transition from 'react-transition-group/Transition'
import PropTypes from 'prop-types'
import { fromEvent } from 'rxjs'
import { map, mapTo, filter, startWith, tap } from 'rxjs/operators'
import classNames from 'classnames'
import style from './AppearOnScrollReach.css'


export class AppearOnScrollReach extends Component {
  static propTypes = {
    coefficient: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    offset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }).isRequired,
    timeout: PropTypes.number
  }

  static defaultProps = {
    coefficient: 0.5,
    timeout: 0
  }

  state = { reached: false }

  componentDidMount() {
    const breakpoint = window.innerHeight * this.props.coefficient

    this.scroll$ = fromEvent(window, 'scroll')
      .pipe(
        map(this.getWrapperTop),
        filter(val => val <= breakpoint)
      ).subscribe(this.onReach)
  }

  componentWillUnmount() {
    this.scroll$.unsubscribe()
  }

  getWrapperTop = () => {
    return this.wrapperNode.getBoundingClientRect().top
  }

  onReach = () => {
    this.setState(prev => ({ ...prev, reached: true }))
    this.scroll$.unsubscribe()
  }

  onWrapperRef = node => {
    if (!this.wrapperNode) {
      this.wrapperNode = node
    }
  }

  render() {
    const { offset, duration, timeout } = this.props
    const { x, y }  = offset

    const defaultStyle = {
      opacity: 0,
      top: `${y}px` || 0,
      left: `${x}px` || 0,
      transition: `opacity ${duration}ms,
                   top ${duration}ms,
                   left ${duration}ms`,
    }

    const transitionStyle = {
      entered: {
        opacity: 1,
        top: 0,
        left: 0
      }
    }

    return (
      <Transition in={this.state.reached} timeout={timeout}>
        {state => (
          <div
            ref={this.onWrapperRef}
            className={style.wrapper}
            style={{
              ...defaultStyle,
              ...transitionStyle[state]
            }}
          >
            {this.props.children}
          </div>
        )}
      </Transition>
    )
  }
}
