import React, { Fragment } from 'react'
import style from './Breadcrumbs.css'
import linksStructure from '../../constants/linksStructure'
import { Link } from '../__basic__'


const getHierarchy = parentLink => {
  let parent = parentLink
  let res = []
  while (parent) {
    res.unshift(linksStructure[parent])
    parent = linksStructure[parent].parent
  }
  return res
}

export const Breadcrumbs = ({ parentLink }) => {
  const hierarchy = getHierarchy(parentLink)

  return (
    <div className={style.wrapper}>
      {hierarchy.map(({ title, path }, i) =>
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
  )
}
