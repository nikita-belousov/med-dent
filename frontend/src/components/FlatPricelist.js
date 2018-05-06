import React, { Component } from 'react'
import _ from 'lodash'

class FlatPricelist extends Component {
  renderCategory() {
    return (
      <div
        className={styles['category']}
        ref={node => this.props.onCategoryRef(category.title, node)}
      >
        <div className={styles['category-title']}>
          {_.capitalize(category.title)}
        </div>
        <div className={styles['services']}>
          {!isEmpty
            ? category.services.map(service => this.renderService(service))
            : <div className={styles['no-results']}>
                <Paragraph>
                  Нет результатов...
                </Paragraph>
              </div>}
        </div>
      </div>
    )
  }

  renderService(service) {
    return (
      <div className={styles['service']}>
        <div className={styles['title']}>
          {service.title}
        </div>
        <div className={styles['line']} />
        <div className={styles['price']}>
          {service.price + '₽'}
        </div>
      </div>
    )
  }

  render() {
    return (

    )
  }
}

export default FlatPricelist
