import { CheckLine, IndianRupee, SquarePen } from 'lucide-react'
import RatingStars from './RatingStars'
import { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const Card = ({ id, name, price, description, category, image, addToCart }) => {
    return (
        <div className="card bg-base-100 w-80 max-h-96 shadow-xl overflow-hidden">
            <div className='h-50 overflow-hidden'>
                <img
                    className='w-full'
                    src={image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt={name} />
            </div>
            <div className="card-body">
                <div className="item-head flex justify-between mt-2">
                    <h2 className="card-title">
                        {name}
                        {/* <div className="badge badge-secondary">NEW</div> */}
                    </h2>
                    <div className='flex'><IndianRupee /> {price}</div>
                </div>
                <div className='h-10 mb-2'>{description}</div>
                <div className="card-actions my-2">
                    {/* <button className="btn btn-success p-3">Buy Now</button> */}
                    <button className="btn btn-primary p-3" onClick={() => addToCart(id, 1)}>Add to Cart</button>
                </div>
                <div className="card-actions justify-end">
                    <div className="badge badge-ghost">{category}</div>
                    {/* <div className="badge badge-outline">Products</div> */}
                </div>
            </div>
        </div>

    )
}

export default Card