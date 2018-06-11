import React from 'react'
import classNames from 'classnames'
import upperFirst from 'lodash/upperFirst'
import style from './NarrowPage.css'
import { Container } from '../../__basic__'


export const NarrowPage = ({
  breadcrumps,
  heading,
  caption,
  children,
  squeeze
}) => {
  const wrapperClass = classNames({
    [style.wrapper]: true,
    [style.wrapperSqueeze]: squeeze
  })

  return (
    <Container>
      <div className={wrapperClass}>
        <Heading breadcrumps={breadcrumps} heading={heading} />
        <div className={style.content}>
          {children}
        </div>
      </div>
    </Container>
  )
}

const Heading = ({ breadcrumps, heading }) =>
  <head className={style.heading}>
    {(breadcrumps && breadcrumps.length > 0) &&
      <div className={style.breadcrumps}>
        {breadcrumps.join(' / ')}
      </div>}
    <div className={style.heading}>
      {heading}
    </div>
  </head>
