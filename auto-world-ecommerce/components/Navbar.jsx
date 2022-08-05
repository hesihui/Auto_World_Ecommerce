import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import {BiCar, BiWorld} from "react-icons/bi";

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext();

    return (
        <div className="navbar-container">
            <h2 className="logo">
                <BiCar /> &nbsp;
                <Link href="/"> AUTO WORLD </Link>
            </h2>
            <button type="button" className="cart-icon" onClick={()=> setShowCart(true)}>
                <AiOutlineShopping />
                <span className="cart-item-qty">{totalQuantities}</span>
            </button>
            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;