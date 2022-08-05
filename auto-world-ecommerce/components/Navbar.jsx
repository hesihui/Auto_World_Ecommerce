import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import {BiCar, BiWorld} from "react-icons/bi";

import { Cart } from './';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <h2 className="logo">
                <BiCar /> &nbsp;
                <Link href="/"> AUTO WORLD </Link>
            </h2>
            <button type="button" className="cart-icon" onClick="">
                <AiOutlineShopping />
                <span className="cart-item-qty">1</span>
            </button>
        </div>
    );
};

export default Navbar;