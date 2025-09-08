import React from 'react'

const RatingStars = ({ rating }) => {
    const stars = [1, 2, 3, 4, 5];
    return <div className='rating-stars flex gap-0.5'>
        {stars.map(star => {
            console.log("star", star, rating);
            return star <= rating
                ? <span className="mask mask-star-2 bg-orange-400 text-orange-400">10</span>
                : <span className="mask mask-star-2 bg-orange-200 text-orange-200">10</span>
        })}
    </div>

}

export default RatingStars