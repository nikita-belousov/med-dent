import React from 'react'
import style from './RatingInput.css'
import { StarRating }  from '../../StarRating'


export const RatingInput = props => (
  <div>
    <div className={style.label}>
      {props.label}
    </div>

    <StarRating
      initialRating={props.value || 0}
      onChange={value => props.onChange({ target: { name: props.name, value  } })}
    />
  </div>
)
