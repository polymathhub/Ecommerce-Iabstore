import React from 'react';
import { Link } from 'react-router-dom';
import { motion as m } from 'framer-motion';

const CATEGORIES = [
  {
    id: 1,
    name: 'Electronics',
    icon: '📱',
    image: 'https://via.placeholder.com/250x150?text=Electronics',
    color: 'from-blue-400 to-blue-600',
    products: 2500,
    discount: '30%'
  },
  {
    id: 2,
    name: 'Fashion & Apparel',
    icon: '👕',
    image: 'https://via.placeholder.com/250x150?text=Fashion',
    color: 'from-pink-400 to-pink-600',
    products: 5000,
    discount: '50%'
  },
  {
    id: 3,
    name: 'Home & Garden',
    icon: '🏠',
    image: 'https://via.placeholder.com/250x150?text=Home',
    color: 'from-green-400 to-green-600',
    products: 1800,
    discount: '40%'
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    icon: '⚽',
    image: 'https://via.placeholder.com/250x150?text=Sports',
    color: 'from-orange-400 to-orange-600',
    products: 1200,
    discount: '35%'
  },
  {
    id: 5,
    name: 'Health & Beauty',
    icon: '💄',
    image: 'https://via.placeholder.com/250x150?text=Beauty',
    color: 'from-purple-400 to-purple-600',
    products: 3000,
    discount: '45%'
  },
  {
    id: 6,
    name: 'Automotive',
    icon: '🚗',
    image: 'https://via.placeholder.com/250x150?text=Automotive',
    color: 'from-red-400 to-red-600',
    products: 800,
    discount: '25%'
  },
  {
    id: 7,
    name: 'Books & Media',
    icon: '📚',
    image: 'https://via.placeholder.com/250x150?text=Books',
    color: 'from-indigo-400 to-indigo-600',
    products: 500,
    discount: '20%'
  },
  {
    id: 8,
    name: 'Toys & Games',
    icon: '🎮',
    image: 'https://via.placeholder.com/250x150?text=Toys',
    color: 'from-yellow-400 to-yellow-600',
    products: 2000,
    discount: '40%'
  },
];

const CATEGORY_DETAILS = {
  'Electronics': {
    subcategories: ['Phones', 'Laptops', 'Tablets', 'Accessories', 'Cameras', 'Smart Devices'],
    description: 'Latest gadgets and electronic devices at unbeatable prices'
  },
  'Fashion & Apparel': {
    subcategories: ['Men\'s Wear', 'Women\'s Wear', 'Shoes', 'Accessories', 'Sports Wear', 'Formal Wear'],
    description: 'Trendy fashion items for every occasion'
  },
  'Home & Garden': {
    subcategories: ['Furniture', 'Decor', 'Bedding', 'Kitchen', 'Outdoor', 'Storage'],
    description: 'Transform your living space with quality home products'
  },
  'Sports & Outdoors': {
    subcategories: ['Sports Gear', 'Fitness Equipment', 'Camping', 'Water Sports', 'Indoor Games', 'Outdoor Tools'],
    description: 'Everything you need for an active lifestyle'
  },
  'Health & Beauty': {
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Supplements', 'Fitness', 'Personal Care'],
    description: 'Products for health and personal care'
  },
  'Automotive': {
    subcategories: ['Car Accessories', 'Maintenance', 'Tools', 'Parts', 'Cleaning', 'Safety'],
    description: 'Quality automotive products and accessories'
  },
  'Books & Media': {
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Comics', 'Audio Books', 'Magazines'],
    description: 'Expand your knowledge with books and media'
  },
  'Toys & Games': {
    subcategories: ['Board Games', 'Puzzles', 'Action Figures', 'Building Blocks', 'Video Games', 'Educational Toys'],
    description: 'Fun and educational toys for all ages'
  },
};

export default function CategoriesList({ layout = 'grid' }) {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Browse thousands of products from trusted sellers
          </p>
        </div>

        {/* Categories Grid */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {CATEGORIES.map((category) => (
            <m.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <Link to={`/products?category=${encodeURIComponent(category.name)}`}>
                <div className="relative h-48 md:h-56 rounded-lg overflow-hidden bg-gradient-to-br shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />
                  
                  {/* Image overlay */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRTVFN0VCIi8+PC9zdmc+'; }}
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                    {/* Top: Icon and Discount Badge */}
                    <div className="flex justify-between items-start">
                      <span className="text-3xl md:text-4xl">{category.icon}</span>
                      <div className="bg-red-600 rounded-full px-2 py-1 text-xs font-bold">
                        -{category.discount}
                      </div>
                    </div>

                    {/* Bottom: Name and Count */}
                    <div className="group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg md:text-xl font-bold mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-white/90">
                        {category.products.toLocaleString()} products
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay with button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </Link>
            </m.div>
          ))}
        </m.div>

        {/* Category Details Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.slice(0, 4).map((category) => (
            <m.div
              key={`details-${category.id}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <span className="text-4xl">{category.icon}</span>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {category.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {CATEGORY_DETAILS[category.name]?.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORY_DETAILS[category.name]?.subcategories.slice(0, 3).map((sub) => (
                      <Link
                        key={sub}
                        to={`/products?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub)}`}
                        className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                    <Link
                      to={`/products?category=${encodeURIComponent(category.name)}`}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      +More
                    </Link>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </div>
  );
}
