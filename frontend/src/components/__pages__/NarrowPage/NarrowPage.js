import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import upperFirst from 'lodash/upperFirst'
import { resetBreadcrumbs } from '../../../actions'
import style from './NarrowPage.css'
import { Container, Link } from '../../__basic__'


const mapStateToProps = state => ({ breadcrumbs: state.common.breadcrumbs })

const mapDispatchToProps = { resetBreadcrumbs }


let NarrowPage = class extends Component {
  componentWillUnmount() {
    this.props.resetBreadcrumbs()
  }

  render() {
    const {
      breadcrumbs,
      heading,
      caption,
      children,
      squeeze,
      renderFullWidthSection
    } = this.props

    const contentClass = classNames({
      [style.content]: true,
      [style.contentSqueeze]: squeeze
    })

    return (
      <Container>
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
            <div className={style.heading}>
              {heading}
            </div>
            {caption &&
              <div className={style.caption}>
                {caption}
              </div>}
          </header>

          <div className={contentClass}>
            {children}
          </div>

          {renderFullWidthSection &&
            <div className={style.fullWidthSection}>
              {renderFullWidthSection()}
            </div>}
        </div>
      </Container>
    )
  }
}


NarrowPage = connect(mapStateToProps, mapDispatchToProps)(NarrowPage)

export { NarrowPage }
