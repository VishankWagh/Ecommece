import { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, MapPinHouse, PlusIcon, Search, User } from 'lucide-react';
import { Link } from 'react-router';

import RatingStars from '../../components/RatingStars';
import CartItem from '../../components/CartItem';

const Cart = () => {
    const [quantity, setQuantity] = useState("");
    const [cart, setCart] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    console.log(cart, quantity);

    const fetchCart = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/cart/`);

            if (res.data.success) {
                setCart(res.data.cart);
            } else {
                toast.error("Unable to fetch cart items");
            }
        } catch (error) {
            console.log("Error fetching cart items:", error);
            toast.error("Failed to load cart items");
        } finally {
            setLoading(false);
        }
    }

    const updateCartItem = async (cartId, quantity) => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/cart/${cartId}`, { quantity });
            console.log("upd", res);

            // if (res.data.success) {
            //     setCart(res.data.cart);
            // } else {
            //     toast.error("Unable to fetch cart items");
            // }
        } catch (error) {
            console.log("Error updating cart items:", error);
            toast.error("Failed to update cart items");
        }
    }

    const deleteCartItem = async (cartId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/cart/${cartId}`);
            console.log("del", res);

            if (res.data.success) {
                setCart(prvCart => {
                    return prvCart.filter(cartItem => cartItem._id != cartId);
                });
            } else {
                toast.error("Unable to delete cart items");
            }
        } catch (error) {
            console.log("Error deleting cart items:", error);
            toast.error("Failed to delete cart items");
        }
    }

    return (
        <div className='min-h-screen'>
            {loading
                ? <div className="text-center text-primary py-10">Loading notes...</div>
                : <div className="user-list page">
                    <div className="overflow-x-auto mt-10">
                        <div className="text-1xl py-2 mb-8 flex items-center justify-between">
                            <div className="text">Search Results</div>
                            <Link className="btn btn-info b-rad" to={'/items/items-list'}><PlusIcon className="" /> <span>Add more</span></Link>
                        </div>
                        <div className="stores-list flex flex-wrap items-center gap-7">
                            {cart.map((cart, id) => <CartItem key={id} {...cart} updateCartItem={updateCartItem} deleteCartItem={deleteCartItem} />)}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart