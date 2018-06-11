import React, { Component, Fragment } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { fromEvent, empty } from 'rxjs'
import { map, startWith, filter } from 'rxjs/operators'

import {
  WARNING_TEXT,
  NAVIGATION_LINKS,
  SOCIAL_LINKS
} from '../../../constants/config'

import style from './Header.css'
import { NavLink, Container } from '../../__basic__'
import { WarningBanner } from '../../WarningBanner'
import { Logo } from '../../Logo'


export class HeaderContainer extends Component {
  state = { attached: false }

  ATTACHED_BREAKPOINT = 165

  componentDidMount() {
    const initial = window.pageYOffset

    const scrollStream = fromEvent(window, 'scroll')
      .pipe(
        startWith(0),
        map(() => window.pageYOffset)
      )

    this.attachStream = scrollStream
      .pipe(
        filter(() => !this.state.attached),
        filter(val => val >= this.ATTACHED_BREAKPOINT),
      ).subscribe(() => this.setState({ attached: true }))

    this.dettachStream = scrollStream
      .pipe(
        filter(() => this.state.attached),
        filter(val => val < this.ATTACHED_BREAKPOINT),
      ).subscribe(() => this.setState({ attached: false }))
  }

  componentWillUnmount() {
    this.attachStream.unsubscribe()
    this.dettachStream.unsubscribe()
  }

  render() {
    return <Header attached={this.state.attached} />
  }
}

const Header = ({ attached }) => {
  const wrapperCls = classNames({
    [style.wrapper]: true,
    [style.wrapperAttached]: attached
  })

  return (
    <Fragment>
      {attached && <div className={style.spaceFiller} />}

      <div className={wrapperCls}>
        <Container>
          <header className={style.header}>
            <HeaderContent
              navLinks={NAVIGATION_LINKS}
              attached={attached}
            />
          </header>
        </Container>

        {/* {(attached && WARNING_TEXT.length > 0)
          && <WarningBanner text={WARNING_TEXT} />} */}
      </div>
    </Fragment>
  )
}

const HeaderContent = ({ navLinks, attached }) =>
  <div className={style.content}>
    <div className={style.logo}>
      <NavLink to="/">
        <Logo minified={attached} />
      </NavLink>
    </div>

    <div className={style.navigation}>
      <ul>
        {navLinks.map(({ title, path }) =>
          <li key={title}>
            <NavLink to={path}>{title}</NavLink>
          </li>
        )}
      </ul>
    </div>

    {attached &&
      <div className={style.socialWrapper}>
        <SocialLinks />
      </div>}
  </div>

const SocialLinks = () =>
  <div className={style.social}>
    {SOCIAL_LINKS.map(({ title, href, icon }) =>
      <div key={title} className={style.socialLink}>
        <a
          href={href}
          title={title}
          target='_blank'
        >
          <FontAwesome name={icon} />
        </a>
      </div>
    )}
  </div>
