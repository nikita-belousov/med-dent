import React, { Component } from 'react'
import times from 'lodash/times'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'


const photosCount = 39

const thumbnails = times(photosCount, n => ({
  src: require('../../assets/images/gallery/thumbnails/' + `${n + 1}_tn.jpg`),
  width: 3,
  height: 2
}))

const photos = times(photosCount, n => ({
  src: require('../../assets/images/gallery/' + `${n + 1}.jpg`)
}))


export class PhotoGallery extends Component {
  state = {
    lightbox: false,
    current: null
  }

  close = () => {
    this.setState({
      lightbox: false,
      current: 0
    })
  }

  open = (e, image) => {
    this.setState({
      lightbox: true,
      current: image.index
    })
  }

  next = () => {
    this.setState(prev => ({
      current: prev.current + 1
    }))
  }

  prev = () => {
    this.setState(prev => ({
      current: prev.current - 1
    }))
  }

  render() {
    return (
      <div>
        <Gallery
          photos={thumbnails}
          onClick={this.open}
        />
        <Lightbox
          images={photos}
          currentImage={this.state.current}
          isOpen={this.state.lightbox}
          onClose={this.close}
          onClickPrev={this.prev}
          onClickNext={this.next}
          backdropClosesModal={true}
        />
      </div>
    )
  }
}
