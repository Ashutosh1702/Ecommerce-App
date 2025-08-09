import React from 'react'
import "./Offers.css"
import execlusive from "../../assets/images/exclu.webp"

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive </h1>
        <h1>Offers For you</h1>
        <p>Best Offers for you</p>
        <p>ONLY FOR BEST SELLERS PRODUCTS</p>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={execlusive} alt="" />
      </div>
    </div>
  )
}

export default Offers
