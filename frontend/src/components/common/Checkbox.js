import React from 'react'
import styles from '../../styles/components/common/Checkbox.css'
import _ from 'lodash'
import FontAwesome from 'react-fontawesome'

const Checkbox = props => {
  const renderLabel = (text) => {
    return <span>{_.capitalize(text) || ''}</span>
  }

  const renderApparent = (checked) => {
    const stateStyle = checked ? 'checked' : 'unchecked'
    return (
      <div className={`${styles['apparent']} ${styles[stateStyle]}`}>
        {checked &&
          <div className={styles['checkmark']}>
            <FontAwesome name='check' />
          </div>}
      </div>
    )
  }

  const { name, label, checked, onChange } = props

  return (
    <div className={styles['wrapper']}>
      <label className={styles['label']}>
        <input
          className={styles['native']}
          type='checkbox'
          name={name || ''}
          checked={checked || false}
          onChange={onChange || null}
        />
        {renderApparent(checked)}
        {renderLabel(label)}
      </label>
    </div>
  )
}

export default Checkbox
