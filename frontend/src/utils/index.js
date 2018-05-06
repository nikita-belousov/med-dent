import React from 'react'

export const cutName = name =>
  name
    .split(' ')
    .map((word, i) => i === 0 ? word : `${word[0]}.`)
    .join(' ')

export function recursiveReactMap(children, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveReactMap(child.props.children, fn)
      })
    }

    return fn(child)
  })
}

export function formatDate(dateStr) {
  const date = new Date(dateStr)

  return date
    .toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    .split(' ')
    .map((w, i) => (i === 1) ? `${w},` : w)
    .join(' ')
    .slice(0, -2)
}

export function getAbsoluteCoords(elem) {
  const box = elem.getBoundingClientRect()

  return {
    top: Math.round(box.top + window.pageYOffset),
    left: Math.round(box.left + window.pageXOffset)
  }
}

export default {
  cutName,
  recursiveReactMap,
  formatDate,
  getAbsoluteCoords
}
