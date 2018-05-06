import React, { Component } from 'react'
import styles from './../../styles/components/pagination/Items.css'

const Items = ({ docs, itemComponent, path }) => (
  <div>
    {docs.map(doc =>
      <div
        key={doc._id}
        className={styles['pagination-item']}
      >
        {React.createElement(itemComponent, { ...doc, path })}
      </div>
    )}
  </div>
)

export default Items
