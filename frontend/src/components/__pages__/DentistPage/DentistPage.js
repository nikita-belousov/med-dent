import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { DENTISTS } from '../../../constants/linksStructure'

import style from './DentistPage.css'
import { fetchDentistPage, setDefaultDentist, appointmentLoad, appointmentOpen } from '../../../actions'
import { Breadcrumbs } from '../../__containers__'
import { PositionLabel, Button } from '../../__basic__'
import { NarrowPage } from '../index'


const mapStateToProps = state => ({ ...state.dentistPage })

const mapDispatchToprops = { fetchDentistPage, setDefaultDentist, appointmentLoad,  appointmentOpen }


let DentistPage = class extends Component {
  componentWillMount() {
    this.props.fetchDentistPage(this.props.match.params.slug)
  }

  onAppointmentClick = () => {
    const { _id, name } = this.props
    this.props.appointmentLoad()
    this.props.appointmentOpen()
    this.props.setDefaultDentist(_id, name)
  }

  render() {
    const { name, positions, about, experience, imageFolder } = this.props
    if (!name || !positions || !about || !experience || !imageFolder ) return null

    const photo = require(`../../../assets/images/staff/${imageFolder}/full.png`)

    return (
      <Breadcrumbs parentLink={DENTISTS}>
        <NarrowPage
          heading={name}
          caption={<PageCaption positions={positions} experience={experience} />}
        >
          <div className={style.columns}>
            <div className={style.left}>
              <p>{about}</p>
              <div className={style.appointment}>
                <Button onClick={this.onAppointmentClick}>
                  Запиться к этому врачу
                </Button>
              </div>
            </div>
            <div className={style.right}>
              <div
                className={style.photo}
                style={{ backgroundImage: `url(${photo})` }}
              />
            </div>
          </div>
        </NarrowPage>
      </Breadcrumbs>
    )
  }
}


const PageCaption = ({ positions, experience }) =>
  <Fragment>
    <div className={style.positions}>
      {positions.map((pos, i) => <PositionLabel key={i}>{pos}</PositionLabel>)}
    </div>
  </Fragment>


DentistPage = connect(mapStateToProps, mapDispatchToprops)(DentistPage)

export { DentistPage }
