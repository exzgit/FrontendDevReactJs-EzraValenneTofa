import React from "react";

function RatingStars({ rating }) {
  const value = Math.max(0, Math.min(5, Number(rating)));
  const stars = Math.round((value / 5) * 5 * 2) / 2;

  return (
    <span className="flex items-center gap-0.5" title={value}>
      {[1, 2, 3, 4, 5].map(i => {
        if (stars >= i) {
          return (
            <svg key={i} className="w-4 h-4" viewBox="0 0 20 20">
              <polygon
                points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36"
                fill="#003057"
                stroke="#003057"
                strokeWidth="1"
              />
            </svg>
          );
        }
        if (stars >= i - 0.5) {
          return (
            <svg key={i} className="w-4 h-4" viewBox="0 0 20 20">
              <defs>
                <linearGradient id={`half${i}`}> 
                  <stop offset="50%" stopColor="#003057" />
                  <stop offset="50%" stopColor="#fff" />
                </linearGradient>
              </defs>
              <polygon
                points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36"
                fill={`url(#half${i})`}
                stroke="#003057"
                strokeWidth="1"
              />
            </svg>
          );
        }
        return (
          <svg key={i} className="w-4 h-4" viewBox="0 0 20 20">
            <polygon
              points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36"
              fill="#fff"
              stroke="#003057"
              strokeWidth="1"
            />
          </svg>
        );
      })}
    </span>
  );
}

export default RatingStars;
