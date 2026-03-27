
import React, { useEffect, useState } from 'react';
import RestaurantCard from './Restaurant/RestaurantCard';
import FilterSelect from './Filter/FilterSelect';
import Checkbox from './Filter/Checkbox';

const API_URL = import.meta.env.VITE_API_URL;

const priceLabels = ['$', '$$', '$$$', '$$$$'];

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNow, setOpenNow] = useState(false);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    const url = category
      ? `${API_URL}/restaurants?category=${encodeURIComponent(category)}`
      : `${API_URL}/restaurants`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setRestaurants(data.restaurants || []);
        setCategories(data.categories || []);
        setLoading(false);
      });
  }, [category]);


  function getPriceCategoryIndex(val) {
    if (val == null) return 0;
    const digits = String(val).replace(/\D/g, '').length;
    if (digits === 1) return 0;
    if (digits === 2) return 1;
    if (digits === 3) return 2;
    return 3;
  }

  const filtered = restaurants.filter(r => {
    if (openNow && !r.opennow) return false;
    if (price && String(getPriceCategoryIndex(r.price) + 1) !== price) return false;
    return true;
  });

  const [visibleCount, setVisibleCount] = useState(16);
  const handleLoadMore = () => setVisibleCount(c => c + 16);

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-8">
      <h1 className="text-3xl sm:text-4xl font-light mb-2 sm:mb-4 px-2 sm:px-4 md:px-12">Restaurants</h1>
      <p className="text-gray-500 mb-4 sm:mb-6 px-2 sm:px-4 md:px-12 w-full md:w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies porttitor consectetur.</p>
      <div className="flex flex-col md:items-center md:flex-row mb-4 sm:mb-6 px-2 sm:px-4 md:px-12 justify-start md:justify-between py-2 sm:py-4 border-t border-b border-gray-300 gap-2 sm:gap-0">
          <div className="flex flex-col md:flex-row gap-2 sm:gap-x-4">
            <label className='text-sm'>Filter By: </label>
            <div className="flex items-center gap-1 border-b min-w-24 h-full">
              <Checkbox variant='circle' label={"Open Now"} checked={openNow} onChange={e => setOpenNow(e.target.checked)}/>
            </div>
            <FilterSelect
              options={priceLabels.map((p, i) => ({ value: String(i+1), label: p }))}
              value={price}
              onChange={setPrice}
              placeholder="Price"
            />
            <FilterSelect
              options={categories.map((c) => ({ value: c, label: c }))}
              value={category}
              onChange={setCategory}
              placeholder="Categories"
            />
          </div>
          <button
            className={`border px-4 py-2 min-w-[120px] ring-none outline-none transition-ease duration-300 ${!openNow && !price && !category ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-800 hover:text-white'}`}
            onClick={() => { if (openNow || price || category) { setOpenNow(false); setPrice(''); setCategory(''); } }}
            disabled={!openNow && !price && !category}
          >
            CLEAR ALL
          </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4 md:px-12">
            {filtered.slice(0, visibleCount).map(r => (
              <RestaurantCard key={r.id} restaurant={{
                id: r.id,
                name: r.name,
                photos: [r.image],
                categories: [r.category],
                rating: r.star,
                price: priceLabels[getPriceCategoryIndex(r.price)] || '$',
                isOpen: r.opennow
              }} />
            ))}
          </div>
          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-8">
              <button
                className="px-32 cursor-pointer py-2 border border-[#003057] text-[#003057] hover:text-white hover:bg-[#003057] transition"
                onClick={handleLoadMore}
              >
                LOAD MORE
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantList;
