import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './../../styles/components/pages/CategoryPage.css'
import NarrowPage from './NarrowPage'
import { PricelistTable } from './../pricelist'
import PositionLabel from './../common/PositionLabel'

import agent from './../../agent'
import { connect } from 'react-redux'

import {
  CATEGORY_PAGE_LOADED,
  CATEGORY_PAGE_UNLOADED
} from './../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.categoryPage
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: CATEGORY_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: CATEGORY_PAGE_UNLOADED })
})

class CategoryPage extends Component {
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
      fullSrc = require(`../../assets/images/staff/${imageFolder}/full.png`)
    }

    return (
      <div
        key={_id}
        className={styles['doctor']}
      >
        <div
          className={styles['photo']}
          style={{ backgroundImage: `url(${fullSrc})` }}
        />
        <div className={styles['about']}>
          <div className={styles['name']}>
            {name}
          </div>
          <div className={styles['positions']}>
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
          <div className={styles['columns']}>
            <div className={styles['content']}>
              {this.props.renderContent()}
            </div>
            <div className={styles['aside']}>
              {doctors && doctors.map(this.renderDoctor)}
            </div>
          </div>
          <div className={styles['pricelist']}>
            <PricelistTable data={[{ title, services }]} />
          </div>
        </NarrowPage>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
