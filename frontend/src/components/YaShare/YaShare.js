import React, { Component } from 'react'
import { COMPANY_LOGO_URL } from '../../constants/urls'


export class YaShare extends Component {
  componentDidMount() {
    const { contentUrl, title, description } = this.props

    const share = global.Ya.share2(this.node, {
      content: {
        url: contentUrl,
        title: title,
        description: description,
        image: COMPANY_LOGO_URL
      },
      theme: {
        services: 'vkontakte,facebook,odnoklassniki,moimir,twitter',
        counter: true
      }
    })
  }

  render() {
    return <div ref={node => this.node = node}></div>
  }
}
