import React, { Component, Fragment } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { fromEvent, empty } from 'rxjs'
import { map, startWith, filter } from 'rxjs/operators'

import style from '../../styles/components/sections/Header.css'
import { NavLink } from '../common'
import { WarningBanner } from '../WarningBanner'
import Container from '../Container'
import { Logo } from '../logo'

import {
  WARNING_TEXT,
  NAVIGATION_LINKS,
  SOCIAL_LINKS
} from './../../constants/config'


class HeaderContainer extends Component {
  ATTACHED_BREAKPOINT = 165

  state = { attached: false }

  componentDidMount() {
    const scrollStream = fromEvent(window, 'scroll')
      .pipe(
        startWith(0),
        map(() => window.pageYOffset)
      )

    const attachStream = scrollStream
      .pipe(
        filter(() => !this.state.attached),
        filter(val => val >= this.ATTACHED_BREAKPOINT),
      ).subscribe(() => this.setState({ attached: true }))

    const dettachStream = scrollStream
      .pipe(
        filter(() => this.state.attached),
        filter(val => val < this.ATTACHED_BREAKPOINT),
      ).subscribe(() => this.setState({ attached: false }))
  }

  componentWillUnmount() {
    attachStream.unsubscribe()
    dettachStream.unsubscribe()
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
          <header className={style['header']}>
            <HeaderContent
              navLinks={NAVIGATION_LINKS}
              attached={attached}
            />
          </header>
        </Container>

        {(attached && WARNING_TEXT.length > 0)
          && <WarningBanner text={WARNING_TEXT} />}
      </div>
    </Fragment>
  )
}

const HeaderContent = ({ navLinks, attached }) =>
  <div className={style.content}>
    <a className={style.logoLink} href="/">
      <div className={style['logo']}>
        <Logo minified={attached} />
      </div>
    </a>

    <div className={style['navigation']}>
      <ul>
        {navLinks.map(({ title, path }) =>
          <li
            key={title}
            onClick={() => window.location.reload()}
          >
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
      <div className={style.socialLink}>
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


export default HeaderContainer
