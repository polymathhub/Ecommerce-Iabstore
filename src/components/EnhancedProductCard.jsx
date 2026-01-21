import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';

export default function EnhancedProductCard({ product, index = 0 }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist?.items || []);

  useEffect(() => {
    setIsWishlisted(wishlist.some(item => item.id === product.id));
  }, [wishlist, product.id]);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const discountPercentage = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-gray-100 aspect-square">
            <img
              src={product.image || 'https://via.placeholder.com/300x300?text=Product'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRTVFN0VCIi8+PC9zdmc+';
              }}
            />

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-bold text-sm">
                -{discountPercentage}%
              </div>
            )}

            {/* Flash Sale Badge */}
            {product.isFlashSale && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md font-bold text-xs">
                ⚡ FLASH
              </div>
            )}

            {/* New Badge */}
            {product.isNew && (
              <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md font-bold text-xs">
                NEW
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all group/wishlist z-10"
            >
              {isWishlisted ? (
                <HeartSolid className="w-5 h-5 text-red-600" />
              ) : (
                <HeartOutline className="w-5 h-5 text-gray-600 group-hover/wishlist:text-red-600" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-3 md:p-4 flex-grow flex flex-col justify-between">
            {/* Product Name */}
            <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>

            {/* Seller Info */}
            {product.seller && (
              <div className="flex items-center space-x-1 mb-2 text-xs text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="truncate">{product.seller}</span>
              </div>
            )}

            {/* Rating */}
            {product.rating !== undefined && (
              <div className="flex items-center space-x-1 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? '★' : '☆'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  ({product.reviewCount || 0})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-2 md:mb-3">
              <div className="flex items-baseline space-x-2">
                <span className="text-lg md:text-xl font-bold text-orange-600">
                  ₦{product.price?.toLocaleString() || 'N/A'}
                </span>
                {product.originalPrice && (
                  <span className="text-xs md:text-sm text-gray-500 line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Delivery Info */}
            {product.delivery && (
              <div className="text-xs text-gray-600 mb-3 flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                </svg>
                <span>{product.delivery}</span>
              </div>
            )}

            {/* Stock Status */}
            {product.stock !== undefined && (
              <div className="text-xs mb-3">
                {product.stock > 5 ? (
                  <span className="text-green-600 font-semibold">In Stock</span>
                ) : product.stock > 0 ? (
                  <span className="text-orange-600 font-semibold">Only {product.stock} left</span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              className={`w-full py-2 rounded-lg font-semibold transition-all text-sm md:text-base ${
                product.stock && product.stock > 0
                  ? 'bg-orange-600 text-white hover:bg-orange-700 active:scale-95'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!product.stock || product.stock === 0}
            >
              {product.stock && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </Link>
    </m.div>
  );
}
