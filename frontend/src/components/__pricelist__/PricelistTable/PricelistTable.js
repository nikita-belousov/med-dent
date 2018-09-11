import React, { Component } from 'react'
import classNames from 'classnames'
import uuid from 'small-uuid'
import capitalize from 'lodash/capitalize'
import style from './PricelistTable.css'
import { Paragraph, TextInput, CheckboxInput } from '../../__basic__'


export class PricelistTable extends Component {
  renderCategory = ({ id, title, services }, i) => {
    const { interactive, onCategoryRef } = this.props
    const isEmpty = services.length === 0

    return (
      <div
        key={i}
        className={style.category}
        ref={interactive && (node => onCategoryRef(id, node))}
      >
        <h3 className={style.categoryTitle}>
          {capitalize(title)}
        </h3>
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

  renderService = ({ title, price }, i) => {
    return (
      <div
        key={i}
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
              appearance='roundTransparent'
              name='title'
              value={filterData.title}
              onChange={onFilterChange}
              placeholder='Что ищете?'
            />
          </div>
          <div className={style.bySocial}>
            <CheckboxInput
              inverted
              name='social'
              label='Социальная скидка'
              checked={filterData.social}
              onChange={onFilterChange}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { data, onScrollableRef, interactive, medium } = this.props

    const wrapperClass = classNames({
      [style.wrapper]: true,
      [style.medium]: medium
    })

    return (
      <div className={wrapperClass}>
        <div className={interactive ? style.pricesInteractive : style.prices}>
          {interactive && this.renderTopBar()}
          <div
            className={style.inner}
            ref={interactive && onScrollableRef}
          >
            {data.map(this.renderCategory)}
          </div>
        </div>
      </div>
    )
  }
}
