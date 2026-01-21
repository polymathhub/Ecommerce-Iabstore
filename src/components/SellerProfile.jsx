import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { HeartIcon, StarIcon, TruckIcon, CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { MessageIcon } from '@heroicons/react/24/outline';

const MOCK_SELLER = {
  id: 1,
  name: 'TechHub Electronics',
  logo: 'https://via.placeholder.com/100x100?text=TechHub',
  banner: 'https://via.placeholder.com/1200x300?text=TechHub+Banner',
  description: 'Your trusted source for quality electronics and gadgets. We deliver fast and provide excellent customer service.',
  rating: 4.8,
  reviewCount: 5234,
  followers: 12500,
  isFollowing: false,
  badge: 'Official Store',
  joinDate: '2019',
  responseTime: '< 2 hours',
  shippingSpeed: 'Fast',
  productQuality: 'High',
  stats: {
    positiveRating: '98%',
    orders: '50K+',
    onTimeDelivery: '99%',
  },
  products: [
    {
      id: 101,
      name: 'Wireless Earbuds Pro',
      price: 4500,
      originalPrice: 7500,
      rating: 4.7,
      reviews: 234,
      image: 'https://via.placeholder.com/200x200?text=Earbuds',
    },
    {
      id: 102,
      name: 'USB-C Hub',
      price: 2400,
      originalPrice: 4000,
      rating: 4.6,
      reviews: 156,
      image: 'https://via.placeholder.com/200x200?text=Hub',
    },
    {
      id: 103,
      name: 'Phone Screen Protector',
      price: 800,
      originalPrice: 1500,
      rating: 4.5,
      reviews: 89,
      image: 'https://via.placeholder.com/200x200?text=Protector',
    },
    {
      id: 104,
      name: 'Laptop Cooling Pad',
      price: 3500,
      originalPrice: 5500,
      rating: 4.8,
      reviews: 312,
      image: 'https://via.placeholder.com/200x200?text=Cooling',
    },
  ],
};

export default function SellerProfile({ sellerId = 1 }) {
  const [isFollowing, setIsFollowing] = useState(MOCK_SELLER.isFollowing);
  const [followerCount, setFollowerCount] = useState(MOCK_SELLER.followers);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={MOCK_SELLER.banner}
          alt="Seller banner"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmNjEzNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VGVjaEh1YjwvdGV4dD48L3N2Zz4=';
          }}
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Seller Info Section */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Profile Header */}
        <m.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6 md:mb-0">
            {/* Logo */}
            <img
              src={MOCK_SELLER.logo}
              alt={MOCK_SELLER.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover ring-4 ring-white shadow-lg -mt-16 md:-mt-20"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY2MTM1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5USDwvdGV4dD48L3N2Zz4=';
              }}
            />

            {/* Info */}
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {MOCK_SELLER.name}
                </h1>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>{MOCK_SELLER.badge}</span>
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`w-5 h-5 ${i < Math.floor(MOCK_SELLER.rating) ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900">{MOCK_SELLER.rating}</span>
                <span className="text-gray-600">({MOCK_SELLER.reviewCount.toLocaleString()} reviews)</span>
              </div>

              <p className="text-gray-600 mt-3 max-w-2xl">
                {MOCK_SELLER.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 w-full md:w-auto">
            <button
              onClick={handleFollowToggle}
              className={`px-6 py-3 rounded-lg font-semibold transition-all text-center ${
                isFollowing
                  ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {isFollowing ? '✓ Following' : '+ Follow Store'}
            </button>
            <button className="px-6 py-3 rounded-lg font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <span>Contact Seller</span>
            </button>
          </div>
        </m.div>

        {/* Stats */}
        <m.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 py-8 border-y border-gray-200">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-orange-600">{MOCK_SELLER.stats.positiveRating}</p>
            <p className="text-sm text-gray-600">Positive Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-orange-600">{MOCK_SELLER.stats.orders}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-orange-600">{followerCount.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-blue-600">{MOCK_SELLER.responseTime}</p>
            <p className="text-sm text-gray-600">Response Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-green-600">{MOCK_SELLER.stats.onTimeDelivery}</p>
            <p className="text-sm text-gray-600">On-Time Delivery</p>
          </div>
        </m.div>

        {/* Additional Info */}
        <m.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Verified Seller</p>
                <p className="text-sm text-gray-600">Since {MOCK_SELLER.joinDate}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <TruckIcon className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">Fast Shipping</p>
                <p className="text-sm text-gray-600">{MOCK_SELLER.shippingSpeed} Delivery</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <StarIcon className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">Quality Assured</p>
                <p className="text-sm text-gray-600">{MOCK_SELLER.productQuality} Quality Items</p>
              </div>
            </div>
          </div>
        </m.div>

        {/* Products Section */}
        <m.div variants={itemVariants} className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_SELLER.products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden group">
                <div className="relative overflow-hidden bg-gray-200 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRTVFN0VCIi8+PC9zdmc+';
                    }}
                  />
                  {product.originalPrice > product.price && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-1 mb-2">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-semibold">{product.rating}</span>
                    <span className="text-xs text-gray-600">({product.reviews})</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-orange-600">₦{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* View All Products Button */}
        <m.div variants={itemVariants} className="mt-8 text-center">
          <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
            View All Products from {MOCK_SELLER.name}
          </button>
        </m.div>
      </m.div>
    </div>
  );
}
