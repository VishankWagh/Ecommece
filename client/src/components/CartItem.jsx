import { IndianRupee, Minus, Plus } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

const CartItem = ({ item = {}, quantity, customerId, _id: cartId, updateCartItem, deleteCartItem }) => {

    const [qty, setQty] = useState(quantity);

    console.log(item, quantity, customerId);

    function updateQuantity(newQty) {
        updateCartItem(cartId, newQty);
        setQty(newQty);
    }

    // { name, price, description, quantity, image }
    return (
        <div className="card card-side bg-base-100 shadow-2xl w-full h-fit rounded-2xl overflow-hidden">
            <div className='cart-img h-40 w-40'>
                <img
                    className='h-full'
                    src={item.image || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                    alt={item.name} />
            </div>
            <div className="card-body flex flex-row justify-between align-middle ml-3.5">
                <div className="item-details">
                    <h2 className="card-title">{item.name}</h2>
                    <p>{item.description}</p>
                </div>
                <div className='bold text-2xl flex'><IndianRupee className='my-1' /><span>{item.price}</span></div>
                <div className="card-actions ">
                    <div className="quantity px-3">
                        <button className="btn btn-circle h-fit b-rad text-2xl" onClick={() => updateQuantity(qty - 1)}>-</button>
                        <span className='p-3'>{qty}</span>
                        <button className="btn btn-circle h-fit b-rad text-2xl" onClick={() => updateQuantity(qty + 1)}>+</button>
                    </div>
                    <button className="btn btn-error b-rad" onClick={() => deleteCartItem(cartId)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem