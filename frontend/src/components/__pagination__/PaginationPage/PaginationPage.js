import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PaginationControls, PaginationItems } from '../index'


export const PaginationPage = ({
  pager,
  totalPages,
  pageToShow,
  itemComponent,
  path,
  docs,
  gridView
}) =>
  <div>
    <PaginationItems
      gridView={gridView}
      docs={docs}
      path={path}
      itemComponent={itemComponent}
    />

    {(totalPages > 1) &&
      <PaginationControls
        path={path}
        pager={pager}
        totalPages={totalPages}
        pageToShow={pageToShow}
      />}
  </div>
