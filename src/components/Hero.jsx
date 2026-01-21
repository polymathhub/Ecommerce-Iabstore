import React from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';

/**
 * Nigeria-optimized Hero component
 * - Naira currency emphasis
 * - Trust signals (Pay on Delivery, Trusted by, delivery cities)
 * - Responsive layout (left text / right illustration)
 */
const Hero = () => {
  return (
    <m.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white"
      aria-label="Main hero"
    >
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Text + CTAs */}
          <div className="lg:col-span-7">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                <span className="text-xs">✅ Pay on Delivery Available</span>
                <span className="ml-2 text-xs text-gray-500">Trusted by 10,000+ Nigerians</span>
              </p>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                Shop Smarter. Delivered Faster. Anywhere in Nigeria.
              </h1>

              <p className="text-lg text-slate-600 mb-6">
                Get the best deals on gadgets, fashion, and daily essentials with fast nationwide delivery and secure payments.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-[1.02] transform transition"
                  aria-label="Shop now"
                >
                  Shop Now
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-900 px-5 py-3 rounded-lg hover:bg-slate-50 transition"
                  aria-label="Browse categories"
                >
                  Browse Categories
                </Link>
              </div>

              {/* Trust & delivery info */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="inline-flex items-center gap-2">
                  <img src="/icons/naija-flag.svg" alt="Nigeria" className="w-5 h-5 rounded-sm" onError={(e)=>{e.target.onerror=null; e.target.src='https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg'}} />
                  <span>Delivery across Lagos, Abuja, Port Harcourt, Ibadan</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-white rounded-lg px-3 py-1 shadow-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-xs">Secure payments (Paystack / Flutterwave style)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Illustration / mockups */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-tr from-white to-blue-50 p-6 shadow-xl transform hover:scale-[1.01] transition">
                <img
                  src="/banners/hero-mockup.png"
                  alt="Shopping mockups"
                  className="w-full h-64 object-contain rounded-lg"
                  onError={(e)=>{e.target.onerror=null; e.target.src='/banners/3.webp'}}
                />
              </div>

              {/* Floating trust cards */}
              <div className="absolute -bottom-4 left-4 hidden md:flex gap-3">
                <div className="bg-white rounded-xl px-4 py-3 shadow-md flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center text-blue-700 font-bold">₦</div>
                  <div>
                    <div className="text-xs text-gray-500">From</div>
                    <div className="text-sm font-semibold text-gray-900">₦2,500</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl px-4 py-3 shadow-md flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-md flex items-center justify-center text-emerald-700 font-bold">🚚</div>
                  <div>
                    <div className="text-xs text-gray-500">Delivery</div>
                    <div className="text-sm font-semibold text-gray-900">1–3 working days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.section>
  );
};

export default Hero;
