import React, { Component } from 'react'
import classNames from 'classnames'
import style from './StarRating.css'
import uuid from 'small-uuid'
import Rating from 'react-rating'


// TODO: выгести svg в отдельный файл и юзать svg-inline-react
const Star = ({ empty }) => {
	const className = classNames({
		[style.star]: true,
		[style.empty]: empty,
		[style.full]: !empty,
	})

	return (
		<div className={className}>
		  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 277.7 261.3">
		    <path d="M150.7,23.5l20.6,62.6c1.7,5.1,6.5,8.6,11.9,8.6h66.2c12.1,0,17.1,15.5,7.3,22.6l-53.4,38.4c-4.4,3.2-6.3,8.9-4.6,14
		    	l20.4,62.3c3.8,11.5-9.3,21.1-19.1,14l-53.9-38.7c-4.4-3.1-10.2-3.1-14.6,0l-53.9,38.7c-9.8,7-22.9-2.6-19.1-14L79,169.7
		    	c1.7-5.2-0.2-10.8-4.6-14L21,117.3c-9.8-7.1-4.8-22.6,7.3-22.6h66.2c5.4,0,10.2-3.5,11.9-8.6L127,23.5C130.7,12,146.9,12,150.7,23.5
		    	z"/>
		  </svg>
		</div>
	)
}

export const StarRating = props =>
	<Rating
		{...props}
		emptySymbol={<Star empty={true} />}
		fullSymbol={<Star />}
	/>
