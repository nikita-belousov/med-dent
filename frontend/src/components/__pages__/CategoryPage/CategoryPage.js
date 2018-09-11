import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { SERVICES } from '../../../constants/linksStructure'
import { fetchDentistForCategory, fetchServicesByCategory } from '../../../actions'
import style from './CategoryPage.css'
import { NarrowPage } from '../index'
import { Breadcrumbs } from '../../__containers__'
import { PricelistTable } from '../../__pricelist__'
import { PositionLabel } from '../../__basic__'
import { Dentist } from '../../Dentist'


const mapStateToProps = state => ({
  ...state.categoryPage,
  mediaQueries: state.common.mediaQueries
})

const mapDispatchToProps = { fetchDentistForCategory, fetchServicesByCategory }


let CategoryPage = class extends Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    dentistsList: PropTypes.array,
    dentists: PropTypes.array,
    services: PropTypes.array,
    renderContent: PropTypes.func,
    renderAside: PropTypes.func
  }

  componentWillMount() {
    const { categoryId, dentistsList, fetchDentistForCategory, fetchServicesByCategory } = this.props
    fetchServicesByCategory(categoryId)
    if (dentistsList && dentistsList.length > 0) {
      dentistsList.forEach(slug => fetchDentistForCategory(slug))
    }
  }

  renderDentist({ imageFolder, _id, name, positions }) {
    let fullSrc
    if (imageFolder) {
      fullSrc = require(`../../../assets/images/staff/${imageFolder}/full.png`)
    }

    return (
      <div key={_id} className={style.doctor}>
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
    const { mediaQueries, title, services, dentists, renderContent } = this.props

    if (!services || services.length === 0) {
      return null
    }

    let dentistsClass
    if (dentists && dentists.length > 0) {
      dentistsClass = classNames({
        [style.dentistsOnly]: dentists.length === 1,
        [style.dentistsPair]: dentists.length === 2
      })
    }

    return (
      <Breadcrumbs parentLink={SERVICES}>
        <NarrowPage squeeze={!mediaQueries.medium} heading={title}>
          <div className={mediaQueries.small ? style.small : undefined}>
            <div className={style.content}>
              {renderContent()}
            </div>
            <div className={dentistsClass}>
              {(dentists && dentists.length > 0) &&
                dentists.map((dentist, i) =>
                  <div key={i} className={style.dentist}>
                    <Dentist {...dentist} />
                  </div>)}
            </div>
            <div className={style.pricelist}>
              <PricelistTable data={[{ title, services }]} />
            </div>
          </div>
        </NarrowPage>
      </Breadcrumbs>
    )
  }
}


CategoryPage = connect(mapStateToProps, mapDispatchToProps)(CategoryPage)

export { CategoryPage }
