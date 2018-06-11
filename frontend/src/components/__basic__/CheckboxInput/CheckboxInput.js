import React from 'react'
import style from './CheckboxInput.css'
import capitalize from 'lodash/capitalize'
import FontAwesome from 'react-fontawesome'


export const CheckboxInput = props => {
  const renderLabel = (text) => {
    return <span>{capitalize(text) || ''}</span>
  }

  const renderApparent = (checked) => {
    const stateStyle = checked ? 'checked' : 'unchecked'

    return (
      <div className={`${style.apparent} ${style[stateStyle]}`}>
        {checked &&
          <div className={style.checkmark}>
            <FontAwesome name='check' />
          </div>}
      </div>
    )
  }

  const { name, label, checked, onChange } = props

  return (
    <div className={style.wrapper}>
      <label className={style.label}>
        <input
          className={style.native}
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
