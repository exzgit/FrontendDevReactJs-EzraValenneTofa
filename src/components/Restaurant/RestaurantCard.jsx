import { Link } from 'react-router-dom';
import RatingStars from '../Rating/RatingStars';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white overflow-hidden flex flex-col h-full">
      <img
        src={restaurant.photos?.[0] || 'https://via.placeholder.com/200x120?text=No+Image'}
        alt={restaurant.name}
        className="w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover"
      />
      <div className="flex-1 flex flex-col justify-between gap-2">
        <div>
          <div className="font-semibold text-lg truncate mb-2" title={restaurant.name}>{restaurant.name}</div>
          <RatingStars rating={restaurant.rating} />
          <div className='flex justify-between items-center mt-4'>
            <div className="flex items-center gap-2 text-sm">
              <div className="text-sm text-gray-500">{restaurant.categories?.[0]}</div>
              
              <div className='h-1 w-1 bg-gray-500 rounded-full'/>
              <span className='text-gray-500'>{restaurant.price}</span>
            </div>
             <div className="">
              {restaurant.isOpen ? (
                <div className='flex items-center gap-x-2'>
                  <div className="h-2 w-2 rounded-full bg-green-600"/> 
                  <span className="text-xs">OPEN NOW</span>
                </div>
              ) : (
                <div className='flex items-center gap-x-2'>
                  <div className="h-2 w-2 rounded-full bg-red-500"/> 
                  <span className="text-xs">CLOSED</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Link
          to={`/restaurant/${restaurant.id}`}
          className="mt-2 w-full bg-[#003057] text-white text-center py-2 hover:bg-[#003e6d] transition font-semibold text-sm"
          tabIndex={0}
        >
          LEARN MORE
        </Link>
      </div>
    </div>
  );
}

export default RestaurantCard;
