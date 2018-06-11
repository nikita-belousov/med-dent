import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  CATEGORY_PAGE_LOADED,
  CATEGORY_PAGE_UNLOADED
} from '../../../constants/actionTypes'

import agent from '../../../agent'
import { connect } from 'react-redux'
import style from './CategoryPage.css'
import { NarrowPage } from '../index'
import { PricelistTable } from '../../__pricelist__'
import { PositionLabel } from '../../__basic__'


const mapStateToProps = state => ({
  ...state.categoryPage
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: CATEGORY_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: CATEGORY_PAGE_UNLOADED })
})


let CategoryPage = class extends Component {
  static propTypes = {
    categoryId: PropTypes.string,
    doctors: PropTypes.array,
    renderContent: PropTypes.func,
    renderAside: PropTypes.func,
  }

  componentWillMount() {
    const { categoryId, dentistsIds } = this.props

    this.props.onLoad(
      Promise.all([
        agent.Services.byCategory(categoryId),
        Promise.all(dentistsIds.map(agent.Staff.byId))
      ])
    )
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  renderDoctor({ imageFolder, _id, name, positions }) {
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
    const { title, loaded, doctors, services } = this.props

    if (!loaded) {
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
              {doctors && doctors.map(this.renderDoctor)}
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
