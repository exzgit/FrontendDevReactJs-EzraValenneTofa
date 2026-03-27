import React from "react";
import RatingStars from "../Rating/RatingStars";

function ReviewItem({ review }) {
  return (
    <div className="flex gap-4 py-4 items-start">
      <img src={review.image} alt={review.name} className="w-16 h-16 object-cover" style={{ borderRadius: '9999px' }} />
      <div className="flex-1 flex flex-col gap-1">
        <div className="font-semibold text-base">{review.name}</div>
        <RatingStars rating={review.rating} />
        <div className="text-sm text-gray-700 mt-1">{review.text}</div>
      </div>
    </div>
  );
}

export default ReviewItem;
