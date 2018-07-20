import React from 'react'
import classNames from 'classnames'
import style from './CheckboxInput.css'
import capitalize from 'lodash/capitalize'
import FontAwesome from 'react-fontawesome'


export const CheckboxInput = props => {
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

  const { inverted, name, renderLabel, label, checked, onChange } = props

  const wrapperClass = classNames({
    [style.wrapper]: true,
    [style.inverted]: inverted
  })

  return (
    <div className={wrapperClass}>
      <label className={style.label}>
        <input
          className={style.native}
          type='checkbox'
          name={name || ''}
          checked={checked || false}
          onChange={onChange || null}
        />
        {renderApparent(checked)}
        {renderLabel
          ? renderLabel()
          : <span>{capitalize(label) || ''}</span>}
      </label>
    </div>
  )
}
