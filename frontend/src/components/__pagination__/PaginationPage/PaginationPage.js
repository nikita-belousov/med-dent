import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PaginationControls, PaginationItems } from '../index'


export const PaginationPage = ({
  pager,
  totalPages,
  pageToShow,
  itemComponent,
  path,
  docs
}) =>
  <div>
    <div>
      <PaginationItems
        docs={docs}
        path={path}
        itemComponent={itemComponent}
      />
    </div>

    {(totalPages > 1) &&
      <div>
        <PaginationControls
          path={path}
          pager={pager}
          totalPages={totalPages}
          pageToShow={pageToShow}
        />
      </div>}
  </div>
