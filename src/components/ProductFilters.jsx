import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ProductFilters({ onFilterChange, onSortChange }) {
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    rating: false,
    seller: false,
    delivery: false,
    condition: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: 'all',
    rating: 0,
    sellers: [],
    delivery: [],
    condition: [],
    sortBy: 'popularity',
  });

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleFilterChange = (type, value) => {
    let updatedFilters = { ...selectedFilters };

    if (type === 'priceRange' || type === 'sortBy') {
      updatedFilters[type] = value;
    } else {
      const arrayKey = type;
      if (updatedFilters[arrayKey].includes(value)) {
        updatedFilters[arrayKey] = updatedFilters[arrayKey].filter(v => v !== value);
      } else {
        updatedFilters[arrayKey] = [...updatedFilters[arrayKey], value];
      }
    }

    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSort = (sortValue) => {
    const updatedFilters = { ...selectedFilters, sortBy: sortValue };
    setSelectedFilters(updatedFilters);
    onSortChange(sortValue);
  };

  const FilterSection = ({ title, filterKey, children }) => (
    <m.div
      initial={false}
      animate={{ height: expandedFilters[filterKey] ? 'auto' : 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-gray-200 overflow-hidden"
    >
      <button
        onClick={() => toggleFilter(filterKey)}
        className="w-full flex items-center justify-between py-4 px-0 hover:text-orange-600 transition-colors"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${
            expandedFilters[filterKey] ? 'rotate-180' : ''
          }`}
        />
      </button>
      {expandedFilters[filterKey] && (
        <div className="pb-4 space-y-3">
          {children}
        </div>
      )}
    </m.div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Sort Options */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Sort By</h3>
        <select
          value={selectedFilters.sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="popularity">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="best-sellers">Best Sellers</option>
        </select>
      </div>

      {/* Price Filter */}
      <FilterSection title="Price" filterKey="price">
        <div className="space-y-2">
          {[
            { label: 'All Prices', value: 'all' },
            { label: '₦0 - ₦5,000', value: '0-5000' },
            { label: '₦5,000 - ₦15,000', value: '5000-15000' },
            { label: '₦15,000 - ₦50,000', value: '15000-50000' },
            { label: '₦50,000 - ₦100,000', value: '50000-100000' },
            { label: '₦100,000+', value: '100000-plus' },
          ].map(option => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:text-orange-600">
              <input
                type="radio"
                name="price"
                value={option.value}
                checked={selectedFilters.priceRange === option.value}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-4 h-4 text-orange-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection title="Customer Ratings" filterKey="rating">
        <div className="space-y-2">
          {[
            { stars: 5, label: '★★★★★ 5 Stars' },
            { stars: 4, label: '★★★★☆ 4 Stars & up' },
            { stars: 3, label: '★★★☆☆ 3 Stars & up' },
            { stars: 2, label: '★★☆☆☆ 2 Stars & up' },
          ].map(option => (
            <label key={option.stars} className="flex items-center space-x-3 cursor-pointer hover:text-orange-600">
              <input
                type="checkbox"
                checked={selectedFilters.rating === option.stars}
                onChange={(e) => handleFilterChange('rating', e.target.checked ? option.stars : 0)}
                className="w-4 h-4 text-orange-600 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Seller Type Filter */}
      <FilterSection title="Seller Type" filterKey="seller">
        <div className="space-y-2">
          {[
            { id: 'official', label: '✓ Official Store' },
            { id: 'verified', label: '✓ Verified Seller' },
            { id: 'preferred', label: '⭐ Preferred Seller' },
          ].map(option => (
            <label key={option.id} className="flex items-center space-x-3 cursor-pointer hover:text-orange-600">
              <input
                type="checkbox"
                checked={selectedFilters.sellers.includes(option.id)}
                onChange={(e) => handleFilterChange('sellers', option.id)}
                className="w-4 h-4 text-orange-600 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Delivery Filter */}
      <FilterSection title="Delivery" filterKey="delivery">
        <div className="space-y-2">
          {[
            { id: 'fast', label: 'Fast Delivery (1-2 days)' },
            { id: 'standard', label: 'Standard Delivery (3-5 days)' },
            { id: 'free', label: 'Free Shipping' },
            { id: 'same-day', label: 'Same Day Delivery' },
          ].map(option => (
            <label key={option.id} className="flex items-center space-x-3 cursor-pointer hover:text-orange-600">
              <input
                type="checkbox"
                checked={selectedFilters.delivery.includes(option.id)}
                onChange={(e) => handleFilterChange('delivery', option.id)}
                className="w-4 h-4 text-orange-600 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Condition Filter */}
      <FilterSection title="Condition" filterKey="condition">
        <div className="space-y-2">
          {[
            { id: 'new', label: 'New' },
            { id: 'refurbished', label: 'Refurbished' },
            { id: 'used', label: 'Used' },
          ].map(option => (
            <label key={option.id} className="flex items-center space-x-3 cursor-pointer hover:text-orange-600">
              <input
                type="checkbox"
                checked={selectedFilters.condition.includes(option.id)}
                onChange={(e) => handleFilterChange('condition', option.id)}
                className="w-4 h-4 text-orange-600 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Clear Filters Button */}
      {Object.values(selectedFilters).some(v => {
        if (Array.isArray(v)) return v.length > 0;
        return v !== 'all' && v !== 0 && v !== 'popularity';
      }) && (
        <button
          onClick={() => {
            setSelectedFilters({
              priceRange: 'all',
              rating: 0,
              sellers: [],
              delivery: [],
              condition: [],
              sortBy: 'popularity',
            });
            onFilterChange({
              priceRange: 'all',
              rating: 0,
              sellers: [],
              delivery: [],
              condition: [],
              sortBy: 'popularity',
            });
          }}
          className="w-full mt-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <XMarkIcon className="w-5 h-5" />
          <span>Clear All Filters</span>
        </button>
      )}
    </div>
  );
}
