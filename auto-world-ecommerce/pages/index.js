
import styles from '../styles/Home.module.css'
import React from 'react';

export default function Home() {
  return (
    <>
        HeroBanner
        <div className="products-heading">
            <h2> Best Selling Products </h2>
            <p> Speakers of many variations </p>
            <div className="product-container">
                {['Product 1', 'Product 2'].map((product) => product)}
            </div>
        </div>

        Footer
    </>
  )
};


