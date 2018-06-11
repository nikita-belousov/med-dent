import React, { Component } from 'react'
import { StarRating }  from '../StarRating'


export const StaticRating = ({ value }) =>
  <StarRating readonly initialRating={value} />
