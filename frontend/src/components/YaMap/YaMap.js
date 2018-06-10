import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import style from './YaMap.css'


export class YaMap extends Component {
  componentDidMount() {
    const ymaps = global.ymaps
    ymaps.ready(init)

    function init() {
      const map = new ymaps.Map('ya-map', {
        center: [55.439, 37.756],
        zoom: 16,
        controls: []
      })

      map.behaviors.disable('scrollZoom')

      const placemark = new ymaps.Placemark([55.4388, 37.7504], {},
        {
          iconLayout: 'default#image',
          iconImageHref: require('../../assets/images/favicon.png'),
          iconImageSize: [32, 32],
        }
      )

      map.geoObjects.add(placemark)
    }
  }

  render() {
    return (
      <div className={style.wrapper}>
        <div id="ya-map" className={style.map}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
