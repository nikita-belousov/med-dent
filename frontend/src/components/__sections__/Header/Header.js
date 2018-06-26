import { Subject, fromEvent, empty } from 'rxjs'
import { map, startWith, filter, tap } from 'rxjs/operators'

import capitalize from 'lodash/capitalize'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { fetchServicesCategories } from '../../../actions'
import style from './Header.css'
import { NavLink, Container } from '../../__basic__'
import { withOverlay } from '../../__hocs__'
import { WarningBanner } from '../../WarningBanner'
import { Logo } from '../../Logo'


const mapStateToProps = state => ({
  mediaQueries: state.common.mediaQueries,
  ...state.header
})

const mapDispatchToProps = { fetchServicesCategories }


let HeaderContainer = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      attached: false,
      dropdown: false,
      mobileMenuActive: false,
      logoNode: null,
      navigationNode: null
    }

    this.attachedBreakpoint = 165
    this.mobileBreakpoint = null
    this.unsubscribe = []
    this.refNodes = []
  }


  componentDidMount() {
    this.props.fetchServicesCategories()

    this.initAttach()
    this.initMobileMenu()
  }

  componentDidUpdate(prevProps, prevState) {
    const { logoNode, navigationNode } = this.state

    if (!(prevState.logoNode && prevState.navigationNode) &&
         (logoNode && navigationNode)) {
      this.initBreakpoint()
    }
  }

  componentWillUnmount() {
    this.unsubscribe.forEach(obs => obs.unsubscribe())
  }

  initBreakpoint = () => {
    const { logoNode, navigationNode } = this.state
    if (!logoNode || !navigationNode) return

    const actualContentWidth = logoNode.offsetWidth + navigationNode.offsetWidth
    this.mobileBreakpoint = actualContentWidth + 100;
  }

  initAttach = () => {
    const isAttached = val =>
      !this.state.attached && (val >= this.attachedBreakpoint)
    const isDettached = val =>
      this.state.attached && (val < this.attachedBreakpoint)

    const attach = () => this.setState(prev => ({ ...prev, attached: true }))
    const detach = () => this.setState(prev => ({ ...prev, attached: false }))

    const scrollStream$ = fromEvent(window, 'scroll')
      .pipe(startWith(0), map(() => window.pageYOffset))

    const attachStream$ = scrollStream$
      .pipe(filter(isAttached))
      .subscribe(() => attach())

    const detachStream$ = scrollStream$
      .pipe(filter(isDettached))
      .subscribe(() => detach())

    this.unsubscribe.push(attachStream$, detachStream$)
  }

  initMobileMenu = () => {
    const activateMenu = () =>
      this.setState(prev => ({ ...prev, mobileMenuActive: !prev.mobileMenuActive }))

    this.mobileMenuClick$ = new Subject()
      .subscribe(() => activateMenu())

    this.unsubscribe.push(this.mobileMenuClick$)
  }

  onLogoRef = node => {
    this.setState(prev => ({ ...prev, logoNode: node }))
  }

  onNavigationRef = node => {
    this.setState(prev => ({ ...prev, navigationNode: node }))
  }

  onMobileMenuClick = () => {
    this.mobileMenuClick$.next(1)
  }

  onLinkClick = () => {
    this.forceUpdate()
  }

  render() {
    const { mediaQueries, navLinks, socialLinks, servicesLinks, warning } = this.props
    const { attached, mobileMenuActive, ready } = this.state

    if (!navLinks || !servicesLinks) return null

    const dropdown = mediaQueries.medium

    return (
      <Header
        dropdown={dropdown}
        mobileMenuActive={mobileMenuActive}
        onMobileMenuClick={this.onMobileMenuClick}
        attached={attached && !dropdown}
        navLinks={navLinks}
        socialLinks={socialLinks}
        servicesLinks={servicesLinks}
        warning={warning}
        // onContentRef={this.onContentRef}
        onLogoRef={this.onLogoRef}
        onNavigationRef={this.onNavigationRef}
        onLinkClick={this.onLinkClick}
      />
    )
  }
}


const Header = ({
  attached,
  navLinks,
  socialLinks,
  servicesLinks,
  warning,
  dropdown,
  mobileMenuActive,
  onMobileMenuClick,
  onContentRef,
  onLogoRef,
  onNavigationRef,
  onLinkClick
}) =>
  <header className={style.headerWrapper}>
    {(dropdown && mobileMenuActive) &&
      <MobileMenu
        onClose={onMobileMenuClick}
        navLinks={navLinks}
        socialLinks={socialLinks}
        servicesLinks={servicesLinks}
      />}

    <div className={style.headerBarWrapper}>
      <HeaderBar
        onRef={onContentRef}
        navLinks={navLinks}
        socialLinks={socialLinks}
        warning={warning}
        attached={attached}
        dropdown={dropdown}
        onMobileMenuClick={onMobileMenuClick}
        mobileMenuActive={mobileMenuActive}
        onLogoRef={onLogoRef}
        onNavigationRef={onNavigationRef}
        onLinkClick={onLinkClick}
      />
    </div>

    {(!dropdown && !attached) &&
      <div className={style.servicesWrapper}>
        <div className={style.servicesMenu}>
          <Container>
            <ul className={style.servicesLinks}>
              {servicesLinks.map(({ slug, title }) =>
                <li key={slug} onClick={onLinkClick}>
                  <NavLink
                    onClick={this.onLinkClick}
                    to={`/${slug}`}
                    activeClassName={style.serviceLinkActive}
                    className={style.categoryLink}
                  >
                    {capitalize(title)}
                  </NavLink>
                </li>
              )}
            </ul>
          </Container>
        </div>
      </div>}
  </header>


let MobileMenu = ({ onClose, navLinks, socialLinks, servicesLinks }) =>
  <div className={style.mobileMenu}>
    <div className={style.mobileMenuInner}>
      <Container responsive={true}>
        <div className={style.mobileTopBar}>
          <div
            className={style.mobileMenuButtonClose}
            onClick={onClose}
          >
            <FontAwesome name='times' />
          </div>
          <div className={style.mobileLogo}>
            <Logo inverted={true} caption={false} />
          </div>
        </div>

        <ul className={style.mobileNav}>
          {navLinks.map(({ title, path }, i) =>
            <li key={i} className={style.mobileNavLink}>
              <NavLink to={path}>
                {capitalize(title)}
              </NavLink>
            </li>
          )}
        </ul>

        <ul className={style.mobileServices}>
          {servicesLinks.map(({ title, slug }, i) =>
            <li key={i} className={style.mobileServiceLink}>
              <NavLink to={slug}>
                {capitalize(title)}
              </NavLink>
            </li>
          )}
        </ul>

        <div className={style.mobileSocialsWrapper}>
          <SocialLinks dropdown={true} links={socialLinks} />
        </div>
      </Container>
    </div>
  </div>

MobileMenu = withOverlay(MobileMenu)


const HeaderBar = ({
  navLinks,
  socialLinks,
  warning,
  attached,
  dropdown,
  mobileMenuActive,
  onMobileMenuClick,
  onContentRef,
  onLogoRef,
  onNavigationRef,
  onLinkClick
}) => {
  const headerBarClass = classNames({
    [style.headerBar]: !attached || dropdown,
    [style.headerBarAttached]: attached && !dropdown
  })

  const navClass = classNames({
    [style.headerBarNav]: !dropdown,
    [style.headerBarNavMobile]: dropdown
  })

  return (
    <Fragment>
      {attached &&
        <div className={style.spaceFiller} />}

      <header className={headerBarClass}>
        <Container responsive={true}>
          <div className={navClass}>
            {dropdown &&
              <div
                className={style.mobileMenuButtonOpen}
                onClick={onMobileMenuClick}
              >
                <FontAwesome name='bars' />
              </div>}

            <div ref={onLogoRef} className={style.logo}>
              <NavLink to="/">
                <Logo
                  minified={attached}
                  inverted={mobileMenuActive}
                  caption={!mobileMenuActive && !attached}
                />
              </NavLink>
            </div>

            {!dropdown &&
              <ul className={style.navigation}>
                {navLinks.map(({ title, path }) =>
                  <li key={title} onClick={onLinkClick}>
                    <NavLink to={path}>
                      {title}
                    </NavLink>
                  </li>
                )}
              </ul>}

            {(!dropdown && attached) &&
              <div className={style.socialWrapper}>
                <SocialLinks links={socialLinks} />
              </div>}
          </div>
        </Container>

        {(attached && warning.length > 0)
          && <WarningBanner text={warning} />}
      </header>
    </Fragment>
  )
}


const SocialLinks = ({ links, dropdown }) => {
  const className = classNames({
    [style.social]: !dropdown,
    [style.socialMobile]: dropdown
  })

  return (
    <div className={className}>
      {links.map(({ title, href, icon }) =>
      <div key={title} className={style.socialLink}>
        <a href={href} title={title} target='_blank'>
          <FontAwesome name={icon} />
        </a>
      </div>
    )}
  </div>
  )
}



HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)

export { HeaderContainer }
