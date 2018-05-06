import React, { Component } from 'react'

class ClosesOnExternalClick extends Component {
  componentDidMount() {
    const tryClose = (e) => {
      if (this.node && !this.node.contains(e.target)) {
        this.props.onClose()
        document.removeEventListener('click', tryClose)
      }
    }

    document.addEventListener('click', tryClose)
  }

  render() {
    return (
      <div ref={node => this.node = node}>
        {this.props.children}
      </div>
    )
  }
}

export default ClosesOnExternalClick
