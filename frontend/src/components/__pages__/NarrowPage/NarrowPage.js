import React from 'react'
import classNames from 'classnames'
import upperFirst from 'lodash/upperFirst'

import { HOME } from '../../../constants/linksStructure'
import style from './NarrowPage.css'
import { Container } from '../../__basic__'
import { Breadcrumbs } from '../../Breadcrumbs'


const Heading = ({ heading, parentLink, caption }) =>
  <header>
    <div className={style.breadcrumbs}>
      <Breadcrumbs parentLink={parentLink} />
    </div>
    <div className={style.heading}>
      {heading}
    </div>
    {caption &&
      <div className={style.caption}>
        {caption}
      </div>}
  </header>

export const NarrowPage = ({
  parentLink,
  heading,
  caption,
  children,
  squeeze,
  renderFullWidthSection
}) => {
  const contentClass = classNames({
    [style.content]: true,
    [style.contentSqueeze]: squeeze
  })

  return (
    <Container>
      <div className={style.wrapper}>
        <Heading
          parentLink={parentLink}
          heading={heading}
          caption={caption}
        />
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

NarrowPage.defaultProps = { parentLink: HOME }
