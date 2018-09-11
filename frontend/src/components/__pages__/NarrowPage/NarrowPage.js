import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import classNames from 'classnames'
import upperFirst from 'lodash/upperFirst'

import { resetBreadcrumbs } from '../../../actions'
import style from './NarrowPage.css'
import { Container, Link } from '../../__basic__'


const mapStateToProps = state => ({
  breadcrumbs: state.common.breadcrumbs,
  mediaQueries: state.common.mediaQueries
})

const mapDispatchToProps = { resetBreadcrumbs }


let NarrowPage = class extends Component {
  componentWillUnmount() {
    this.props.resetBreadcrumbs()
  }

  render() {
    const {
      breadcrumbs,
      mediaQueries,
      heading,
      caption,
      children,
      squeeze,
      renderFullWidth
    } = this.props

    const contentClass = classNames({
      [style.content]: true,
      [style.contentSqueeze]: squeeze
    })

    return (
      <Container responsive={true}>
        <Helmet>
          <title>{heading}</title>
        </Helmet>
        <div className={style.wrapper}>
          <header>
            <div className={style.breadcrumbs}>
              {breadcrumbs.map(({ title, path }, i) =>
                <Fragment key={i}>
                  <Link href={path}>
                    {title}
                  </Link>
                  <span className={style.divider}>
                    /
                  </span>
                </Fragment>
              )}
            </div>
            <h2 className={style.heading}>
              {heading}
            </h2>
            {caption &&
              <div className={style.caption}>
                {caption}
              </div>}
          </header>

          <div className={contentClass}>
            {children}
          </div>

          {renderFullWidth &&
            <div className={style.fullWidth}>
              {renderFullWidth()}
            </div>}
        </div>
      </Container>
    )
  }
}


NarrowPage = connect(mapStateToProps, mapDispatchToProps)(NarrowPage)

export { NarrowPage }
