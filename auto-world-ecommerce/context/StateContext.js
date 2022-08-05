import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        // check if the product we want to add is already in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id)

        // update total price and total quantity in the cart
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart) {
            // if the prodcuta is in the cart
            // then just update the quantity
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
        } else {
            // else, if the product is not in the cart, add new prodcut
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        // give notification for adding a new product to the cart
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);

        // including all the items beside the current one we are updating
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        // decrement the total price and quantity
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuanitity = (id, value) => {
        // go through every item in the cart and find out the specific item
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);

        // including all the items beside the current one we are updating
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if(value === 'inc') {
            // if it's increment of the product quantity
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if(value === 'dec') {
            // or if its decrement
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }

    // increase quantity
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    // decrese quantity
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1)
                return 1;
            else
                return prevQty - 1;
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuanitity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);