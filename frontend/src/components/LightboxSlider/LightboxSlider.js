import uuid from 'small-uuid'
import React, { Component } from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import style from './LightboxSlider.css'
import { Slider } from '../Slider'

require('!style-loader!css-loader?modules=false!formstone/dist/css/themes/light/lightbox.css')
require('!style-loader!css-loader?modules=false!formstone/dist/css/lightbox.css')
require('formstone/dist/js/lightbox.js')


const Image = ({ src, thumbnail, title, galleryName }) => {
  if (!src || !thumbnail) {
    return null
  }

  return (
    <a
      href={src}
      className={`lightboxGallery ${style.thumbnail}`}
    >
      <img src={thumbnail} alt='' />
    </a>
  )
}


export class LightboxSlider extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    slidesToShow: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    // this._galleryName = '123'
  }

  initLightbox() {
    $('a.lightboxGallery').lightbox({
      customClass: style.lightbox,
      // thumbnails: true,
      // infinite: true,
      fixed: true
    })
  }

  render() {
    const { images, ...sliderOptions } = this.props

    if (!images || images.length === 0) {
      return null
    }

    return (
      <div>
        <Slider initLightbox={this.initLightbox} {...sliderOptions}>
          {images.map((image, i) =>
            <div>
              <Image
                key={i}
                galleryName={this._galleryName}
                {...image}
              />
            </div>
          )}
        </Slider>
      </div>
    )
  }
}
