import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  HomeIcon,
  TagIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { getDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import logger from '../utils/logger';
import defaultPfp from '../assets/defaultpfp.png';

/**
 * Utility function to combine CSS classes conditionally
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Jumia-like product categories
const PRODUCT_CATEGORIES = [
  { name: 'Electronics', icon: '📱', subcategories: ['Phones', 'Laptops', 'Tablets', 'Accessories'] },
  { name: 'Fashion', icon: '👕', subcategories: ['Men\'s Wear', 'Women\'s Wear', 'Shoes', 'Bags'] },
  { name: 'Home & Garden', icon: '🏠', subcategories: ['Furniture', 'Decor', 'Bedding', 'Kitchen'] },
  { name: 'Sports & Outdoors', icon: '⚽', subcategories: ['Sports Gear', 'Fitness', 'Outdoors', 'Games'] },
  { name: 'Health & Beauty', icon: '💄', subcategories: ['Skincare', 'Makeup', 'Health', 'Hair Care'] },
  { name: 'Automotive', icon: '🚗', subcategories: ['Car Accessories', 'Maintenance', 'Tools', 'Parts'] },
];

const PROMOTIONS = [
  { text: '⚡ Flash Sale - Up to 70% OFF', color: 'bg-red-500' },
  { text: '🎁 Free Shipping on Orders Above ₦5,000', color: 'bg-green-500' },
  { text: '✨ Mega Clearance Sale - Limited Time', color: 'bg-purple-500' },
];

export default function EnhancedNavbar() {
  const [user] = useAuthState(auth);
  const [profilePic, setProfilePic] = useState('');
  const [userName, setUserName] = useState('User');
  const [profileLoading, setProfileLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePromoIndex, setActivePromoIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Get cart items from Redux store
  const cartItems = useSelector(state => state.cart.items);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Rotate promotions
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromoIndex((prev) => (prev + 1) % PROMOTIONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchProfileData = useCallback(async () => {
    if (!user || profileLoading) return;

    const cachedProfile = sessionStorage.getItem(`profile_${user.uid}`);
    if (cachedProfile) {
      try {
        const profileData = JSON.parse(cachedProfile);
        setProfilePic(profileData.profilePic || defaultPfp);
        setUserName(profileData.name || 'User');
        return;
      } catch (error) {
        logger.error("Failed to parse cached profile", error, "Navbar");
      }
    }

    try {
      setProfileLoading(true);
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        sessionStorage.setItem(`profile_${user.uid}`, JSON.stringify({
          profilePic: userData.profilePic || defaultPfp,
          name: userData.name || 'User'
        }));
        setProfilePic(userData.profilePic || defaultPfp);
        setUserName(userData.name || 'User');
      }
    } catch (error) {
      logger.error("Failed to fetch profile data", error, "Navbar");
      setProfilePic(defaultPfp);
      setUserName('User');
    } finally {
      setProfileLoading(false);
    }
  }, [user, profileLoading]);

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user, fetchProfileData]);

  useEffect(() => {
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleSignOut = async () => {
    try {
      logger.user.action("Sign out");
      await signOut(auth);
      toast.success("Successfully signed out!");
      setIsMobileMenuOpen(false);
    } catch (error) {
      logger.error("Sign out failed", error, "Auth");
      toast.error("Error signing out: " + (error.message || "Please try again."));
    }
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className={`hidden md:block ${PROMOTIONS[activePromoIndex].color} text-white text-center py-2 transition-all duration-500`}>
        <p className="text-sm font-semibold">{PROMOTIONS[activePromoIndex].text}</p>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`
          fixed top-8 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white shadow-md'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                  IAB
                </div>
                <span className="font-bold text-xl text-orange-600 hidden sm:inline">IABtechstore</span>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Search products, brands, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Right Navigation Items */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Cart */}
              <Link to="/cart" className="relative text-gray-700 hover:text-orange-600 transition-colors">
                <ShoppingBagIcon className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              {user ? (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-1 hover:text-orange-600 transition-colors">
                    <img
                      src={profilePic}
                      alt={userName}
                      className="h-7 w-7 rounded-full object-cover ring-1 ring-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">{userName.split(' ')[0]}</span>
                    <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none z-50">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/my-account"
                            className={classNames(
                              active ? 'bg-orange-50' : '',
                              'flex items-center px-4 py-2 text-sm text-gray-700 hover:text-orange-600'
                            )}
                          >
                            <UserCircleIcon className="mr-2 h-5 w-5" />
                            My Account
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/wishlist"
                            className={classNames(
                              active ? 'bg-orange-50' : '',
                              'flex items-center px-4 py-2 text-sm text-gray-700 hover:text-orange-600'
                            )}
                          >
                            <HeartIcon className="mr-2 h-5 w-5" />
                            Wishlist
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={classNames(
                              active ? 'bg-orange-50' : '',
                              'w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:text-orange-600'
                            )}
                          >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/signin"
                    className="text-gray-700 hover:text-orange-600 text-sm font-medium transition-colors hidden sm:inline"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-orange-600 text-white px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-700"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Categories Bar - Desktop Only */}
          <div className="hidden md:flex border-t border-gray-100 py-3 overflow-x-auto space-x-1">
            {PRODUCT_CATEGORIES.map((category) => (
              <Menu key={category.name} as="div" className="relative">
                <Menu.Button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors whitespace-nowrap">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none z-40">
                    {category.subcategories.map((sub) => (
                      <Menu.Item key={sub}>
                        {({ active }) => (
                          <Link
                            to={`/products?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub)}`}
                            className={classNames(
                              active ? 'bg-orange-50 text-orange-600' : 'text-gray-700',
                              'block px-4 py-2 text-sm hover:text-orange-600'
                            )}
                          >
                            {sub}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            ))}

            {/* Special Links */}
            <Link
              to="/products?flash-sale=true"
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>⚡</span>
              <span>Flash Sales</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="hidden md:block h-40"></div>
      <div className="md:hidden h-16"></div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-40 max-h-96 overflow-y-auto">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Mobile Categories */}
          <div className="divide-y divide-gray-200">
            {PRODUCT_CATEGORIES.map((category) => (
              <div key={category.name}>
                <Link
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                >
                  {category.icon} {category.name}
                </Link>
              </div>
            ))}
            <Link
              to="/products?flash-sale=true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              ⚡ Flash Sales
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Tab Navigation (for mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 px-2">
          <Link to="/" className={classNames(location.pathname === '/' ? 'text-orange-600' : 'text-gray-500', 'flex flex-col items-center justify-center flex-1 text-xs font-medium')}>
            <HomeIcon className="h-6 w-6 mb-1" />
            Home
          </Link>
          <Link to="/products" className={classNames(location.pathname === '/products' ? 'text-orange-600' : 'text-gray-500', 'flex flex-col items-center justify-center flex-1 text-xs font-medium')}>
            <TagIcon className="h-6 w-6 mb-1" />
            Products
          </Link>
          <Link to="/cart" className={classNames(location.pathname === '/cart' ? 'text-orange-600' : 'text-gray-500', 'flex flex-col items-center justify-center flex-1 text-xs font-medium relative')}>
            <ShoppingBagIcon className="h-6 w-6 mb-1" />
            Cart
            {cartItemCount > 0 && <span className="absolute top-0 right-2 bg-orange-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartItemCount}</span>}
          </Link>
          <Link to={user ? '/my-account' : '/signin'} className={classNames(location.pathname.includes('account') || location.pathname === '/signin' ? 'text-orange-600' : 'text-gray-500', 'flex flex-col items-center justify-center flex-1 text-xs font-medium')}>
            {user ? <img src={profilePic} alt="Profile" className="h-6 w-6 rounded-full mb-1" /> : <UserCircleIcon className="h-6 w-6 mb-1" />}
            Account
          </Link>
        </div>
      </nav>
    </>
  );
}
