import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
export const Item = (props) => {
  return (
    <div className='item'>
        <Link to={'/prdouct/${props.id}'}><img src={props.image} alt=""/></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                <p>${props.new_price}</p>
            </div>
            <div className="item-price-old">
                <p>${props.old_price}</p>
            </div>
        </div>
    </div>
  )
}
