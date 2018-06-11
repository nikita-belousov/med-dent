import React from 'react'
import style from './NavArrow.css'

export const NavArrow = ({ type, onClick, wrapperClass }) => {
  let arrowClass = ''
  switch(type) {
    case 'next':
      arrowClass += style.arrowNext
      break
    case 'prev':
      arrowClass += style.arrowPrev
      break
  }

  return (
    <div className={wrapperClass || ''}>
      <div
        className={arrowClass}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.98 462.46">
          <path d="M121.5,231.22,272.58,80.14a38.91,38.91,0,0,0,0-55L258.83,11.42a38.81,38.81,0,0,0-55,0L26,189.28a5.57,5.57,0,0,0-.92.52L11.36,203.58a39.34,39.34,0,0,0,0,55.31l13.75,13.69c.28.34.64.36.92.7l177.8,177.8a38.92,38.92,0,0,0,55,0l13.75-13.75a38.91,38.91,0,0,0,0-55Z"/>
        </svg>
      </div>
    </div>
  )
}
