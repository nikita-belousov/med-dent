import React, { Component } from 'react'
import uuid from 'small-uuid'
import capitalize from 'lodash/capitalize'
import style from './PricelistTable.css'
import { Paragraph, TextInput, CheckboxInput } from '../../__basic__'


export class PricelistTable extends Component {
  renderCategory = ({ id, title, services }) => {
    const { interactive, onCategoryRef } = this.props
    const isEmpty = services.length === 0

    return (
      <div
        key={id}
        className={style.category}
        ref={interactive &&
          (node => onCategoryRef(id, node))}
      >
        <div className={style.categoryTitle}>
          {capitalize(title)}
        </div>
        <div className={style.services}>
          {!isEmpty
            ? services.map(this.renderService)
            : <div className={style.noResults}>
                <Paragraph>
                  Нет результатов...
                </Paragraph>
              </div>}
        </div>
      </div>
    )
  }

  renderService = ({ title, price }) => {
    return (
      <div
        key={uuid.create()}
        className={style.service}
      >
        <div className={style.title}>
          {title}
        </div>
        <div className={style.line} />
        <div className={style.price}>
          {price + '₽'}
        </div>
      </div>
    )
  }

  renderTopBar() {
    const { filterData, onFilterChange } = this.props

    return (
      <div className={style.topBar}>
        <div className={style.filter}>
          <div className={style.byTitle}>
            <TextInput
              alt
              appearance='round-transparent'
              name='title'
              value={filterData.title}
              onChange={onFilterChange}
              placeholder='Что ищете?'
            />
          </div>
          <div className={style.bySocial}>
            <Checkbox
              name='social'
              label='только с социальной скидкой'
              checked={filterData.social}
              onChange={onFilterChange}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      data,
      onScrollableRef,
      interactive
    } = this.props

    return (
      <div className={interactive ? style.pricesInteractive : style.prices}>
        {interactive && this.renderTopBar()}
        <div
          className={style.inner}
          ref={interactive && onScrollableRef}
        >
          {data.map(this.renderCategory)}
        </div>
      </div>
    )
  }
}
