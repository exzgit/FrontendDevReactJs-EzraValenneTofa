import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import RatingStars from "../Rating/RatingStars";
import ReviewItem from "./ReviewItem";

const API_URL = import.meta.env.VITE_API_URL;

function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRestaurant(data);
        setLoading(false);
      });
    fetch(`${API_URL}/restaurants/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : (data.items || []));
      });
  }, [id]);


  if (loading) return <div>Loading...</div>;
  if (!restaurant) return <div>Not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 md:px-8 py-8">
        <img
        src={restaurant.image || 'https://via.placeholder.com/200x120?text=No+Image'}
        alt={restaurant.name}
        className="w-full h-28 sm:h-32 md:h-36 lg:h-64 object-cover"
      />
      <div className="mb-6">
        <div className="text-2xl font-bold mb-2">{restaurant.name}</div>
        <RatingStars rating={restaurant.rating || restaurant.star} />
        <div className="flex items-center mt-4 gap-x-2">
            <div className="text-sm text-gray-500">{restaurant.category}</div>
            <div className='h-1 w-1 bg-gray-500 rounded-full'/>
            <span className='text-gray-500'>${restaurant.price}</span>
        </div>
      </div>
      <div className="border-t pt-2 mb-6">
        <div className="text-lg font-semibold mb-4">Description</div>
        <div className="flex flex-col gap-0">
          {restaurant.text}
        </div>
      </div>
      <div className="border-t pt-2 mb-6">
        <div className="text-lg font-semibold mb-4">Reviews</div>
        <div className="flex flex-col gap-0 divide-y divide-gray-200">
          {reviews.length === 0 && <div className="text-gray-400 italic">No reviews yet.</div>}
          {reviews.map((review, idx) => (
            <ReviewItem key={review.id || idx} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;
