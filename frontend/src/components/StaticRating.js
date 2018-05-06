import React, { Component } from 'react'
import StarRating from './StarRating'

const StaticRating = props => {
  return (
    <StarRating
      readonly
      initialRating={props.value}
    />
  )
}

export default StaticRating
