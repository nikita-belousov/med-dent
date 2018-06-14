import React, { Component } from 'react'
import classNames from 'classnames'
import style from './PaginationItems.css'


export const PaginationItems = ({ docs, itemComponent, path, gridView }) => {
  const className = classNames({
    [style.items]: !gridView,
    [style.itemsGrid]: gridView
  })

  return (
    <div className={className}>
      {docs.map(doc =>
        <div
          key={doc._id}
          className={style.item}
        >
          {React.createElement(itemComponent, { ...doc, path })}
        </div>
      )}
    </div>
  )
}
