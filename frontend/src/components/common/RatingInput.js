import React from 'react'
import styles from '../../styles/components/common/RaitingInput.css'
import StarRating from './../StarRating'

const RatingInput = props => (
  <div>
    <div className={styles['label']}>
      {props.label}
    </div>
    <StarRating
      initialRating={props.value || 0}
      onChange={value => props.onChange({ target: { name: props.name, value  } })}
    />
  </div>
)

export default RatingInput
