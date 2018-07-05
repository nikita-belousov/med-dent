import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './PaginationItems.css'


const mapStateToProps = state => ({ mediaQueries: state.common.mediaQueries })


let PaginationItems = ({ mediaQueries, docs, itemComponent, path, gridView }) => {
  const className = classNames({
    [style.items]: !gridView,
    [style.itemsGrid]: gridView,
    [style.medium]: mediaQueries.medium,
    [style.small]: mediaQueries.small
  })

  return (
    <div className={className}>
      {docs.map(doc =>
        <div
          key={doc._id}
          className={style.item}
        >
          <div className={style.itemInner}>
            {React.createElement(itemComponent, { ...doc, path })}
          </div>
        </div>
      )}
    </div>
  )
}


PaginationItems = connect(mapStateToProps)(PaginationItems)

export { PaginationItems }
