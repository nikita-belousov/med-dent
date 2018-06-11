import React, { Component } from 'react'
import style from './PaginationItems.css'


export const PaginationItems = ({ docs, itemComponent, path }) => (
  <div className={style.items}>
    {docs.map(doc =>
      <div
        key={doc._id}
        className={style.paginationItem}
      >
        {React.createElement(itemComponent, { ...doc, path })}
      </div>
    )}
  </div>
)
