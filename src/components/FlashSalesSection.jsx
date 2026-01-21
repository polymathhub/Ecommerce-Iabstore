import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const FLASH_SALE_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Wireless Earbuds',
    originalPrice: 15000,
    salePrice: 4500,
    image: 'https://via.placeholder.com/200x200?text=Earbuds',
    rating: 4.8,
    reviews: 125,
    seller: 'TechHub Store',
    badge: 'HOT'
  },
  {
    id: 2,
    name: '4K Webcam',
    originalPrice: 25000,
    salePrice: 7500,
    image: 'https://via.placeholder.com/200x200?text=Webcam',
    rating: 4.6,
    reviews: 89,
    seller: 'Digital World',
    badge: 'FLASH'
  },
  {
    id: 3,
    name: 'Smart Watch Pro',
    originalPrice: 35000,
    salePrice: 17500,
    image: 'https://via.placeholder.com/200x200?text=SmartWatch',
    rating: 4.7,
    reviews: 256,
    seller: 'Gadget Central',
    badge: 'SALE'
  },
  {
    id: 4,
    name: 'USB-C Hub',
    originalPrice: 8000,
    salePrice: 2400,
    image: 'https://via.placeholder.com/200x200?text=Hub',
    rating: 4.5,
    reviews: 67,
    seller: 'Tech Store',
    badge: 'HOT'
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    originalPrice: 12000,
    salePrice: 6000,
    image: 'https://via.placeholder.com/200x200?text=Keyboard',
    rating: 4.9,
    reviews: 342,
    seller: 'Gaming Zone',
    badge: 'FLASH'
  },
  {
    id: 6,
    name: 'Portable Speaker',
    originalPrice: 6000,
    salePrice: 1800,
    image: 'https://via.placeholder.com/200x200?text=Speaker',
    rating: 4.4,
    reviews: 156,
    seller: 'Audio Pro',
    badge: 'SALE'
  },
];

const FLASH_SALE_TIMES = [
  { hour: '06:00', status: 'completed' },
  { hour: '09:00', status: 'completed' },
  { hour: '12:00', status: 'active' },
  { hour: '15:00', status: 'upcoming' },
  { hour: '18:00', status: 'upcoming' },
  { hour: '21:00', status: 'upcoming' },
];

function CountdownTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-bold">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
      </svg>
      <span>{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
    </div>
  );
}

export default function FlashSalesSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [saleEndTime] = useState(new Date().getTime() + 3 * 60 * 60 * 1000); // 3 hours from now

  const scroll = (direction) => {
    const container = document.getElementById('flash-sale-scroll');
    const scrollAmount = 400;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const discountPercentage = (original, sale) => {
    return Math.round(((original - sale) / original) * 100);
  };

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="text-4xl">⚡</div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Flash Sales
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Crazy deals, limited time only!
                </p>
              </div>
            </div>
            <CountdownTimer endTime={saleEndTime} />
          </div>

          {/* Hourly Sale Times */}
          <div className="flex overflow-x-auto space-x-2 pb-2 md:pb-0 md:grid md:grid-cols-6 md:gap-2">
            {FLASH_SALE_TIMES.map((time) => (
              <button
                key={time.hour}
                className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                  time.status === 'active'
                    ? 'bg-orange-600 text-white shadow-lg ring-2 ring-orange-300'
                    : time.status === 'completed'
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50'
                }`}
              >
                {time.hour}
                {time.status === 'active' && <span className="ml-2">●</span>}
              </button>
            ))}
          </div>
        </m.div>

        {/* Products Carousel */}
        <div className="relative">
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            id="flash-sale-scroll"
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scroll-smooth"
          >
            {FLASH_SALE_PRODUCTS.map((product) => (
              <m.div
                key={product.id}
                variants={itemVariants}
                className="flex-shrink-0 w-48 md:w-56 snap-center group"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-gray-200 h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRTVFN0VCIi8+PC9zdmc+';
                        }}
                      />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-bold text-sm">
                        -{discountPercentage(product.originalPrice, product.salePrice)}%
                      </div>

                      {/* Sale Badge */}
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md font-bold text-xs">
                        {product.badge}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      {/* Product Name */}
                      <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Seller */}
                      <p className="text-xs text-gray-600 mb-2">{product.seller}</p>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-3">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-lg md:text-xl font-bold text-orange-600">
                            ₦{product.salePrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ₦{product.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </m.div>
            ))}
          </m.div>

          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all z-10 hidden md:flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all z-10 hidden md:flex items-center justify-center"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* View All Sales */}
        <div className="mt-8 text-center">
          <Link
            to="/products?flash-sale=true"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            View All Flash Sales →
          </Link>
        </div>
      </div>
    </div>
  );
}
