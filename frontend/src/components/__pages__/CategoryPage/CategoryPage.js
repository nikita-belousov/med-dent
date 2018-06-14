import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchCategoryPage } from '../../../actions'
import style from './CategoryPage.css'
import { NarrowPage } from '../index'
import { PricelistTable } from '../../__pricelist__'
import { PositionLabel } from '../../__basic__'


const mapStateToProps = state => ({ ...state.categoryPage })

const mapDispatchToProps = { fetchCategoryPage }


let CategoryPage = class extends Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    dentistsIds: PropTypes.array.isRequired,
    dentists: PropTypes.array,
    services: PropTypes.array,
    renderContent: PropTypes.func,
    renderAside: PropTypes.func
  }

  componentWillMount() {
    const { categoryId, dentistsIds, fetchCategoryPage } = this.props
    fetchCategoryPage(categoryId, dentistsIds)
  }

  renderDentist({ imageFolder, _id, name, positions }) {
    let fullSrc
    if (imageFolder) {
      fullSrc = require(`../../../assets/images/staff/${imageFolder}/full.png`)
    }

    return (
      <div
        key={_id}
        className={style.doctor}
      >
        <div
          className={style.photo}
          style={{ backgroundImage: `url(${fullSrc})` }}
        />
        <div className={style.about}>
          <div className={style.name}>
            {name}
          </div>
          <div className={style.positions}>
            {positions.join(', ')}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { title, dentists, services } = this.props

    if (!dentists || !services) {
      return null
    }

    return (
      <div>
        <NarrowPage heading={title}>
          <div className={style.columns}>
            <div className={style.content}>
              {this.props.renderContent()}
            </div>
            <div className={style.aside}>
              {dentists && dentists.map(this.renderDentist)}
            </div>
          </div>
          <div className={style.pricelist}>
            <PricelistTable data={[{ title, services }]} />
          </div>
        </NarrowPage>
      </div>
    )
  }
}


CategoryPage = connect(mapStateToProps, mapDispatchToProps)(CategoryPage)

export { CategoryPage }
