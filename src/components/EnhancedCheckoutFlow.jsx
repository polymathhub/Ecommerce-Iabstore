import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { CheckCircleIcon, TruckIcon, CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/solid';

export default function EnhancedCheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const DELIVERY_OPTIONS = [
    {
      id: 'express',
      name: 'Express Delivery',
      description: 'Get your order by tomorrow',
      fee: 500,
      time: '1 day',
      icon: '⚡',
    },
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: 'Delivery in 3-5 business days',
      fee: 200,
      time: '3-5 days',
      icon: '🚚',
    },
    {
      id: 'economy',
      name: 'Economy Delivery',
      description: 'Budget-friendly delivery',
      fee: 0,
      time: '7-10 days',
      icon: '📦',
    },
  ];

  const PAYMENT_METHODS = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCardIcon,
      description: 'Visa, Mastercard, Verve',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: BanknotesIcon,
      description: 'Direct bank payment',
    },
    {
      id: 'paystack',
      name: 'Paystack',
      icon: '💳',
      description: 'Secure payment gateway',
    },
    {
      id: 'wallet',
      name: 'IAB Wallet',
      icon: '💰',
      description: 'Use your wallet balance',
    },
  ];

  const steps = [
    { number: 1, title: 'Shipping Address', icon: '📍' },
    { number: 2, title: 'Delivery Method', icon: '🚚' },
    { number: 3, title: 'Payment Method', icon: '💳' },
    { number: 4, title: 'Order Review', icon: '✓' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all ${
                      currentStep >= step.number
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-600">Step {step.number}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 mt-6 transition-all ${
                      currentStep > step.number ? 'bg-orange-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Address */}
            {currentStep === 1 && (
              <m.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="col-span-1 md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="col-span-1 md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </m.div>
            )}

            {/* Step 2: Delivery Method */}
            {currentStep === 2 && (
              <m.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Delivery Method</h2>
                
                <div className="space-y-4">
                  {DELIVERY_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        deliveryType === option.id
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={deliveryType === option.id}
                        onChange={(e) => setDeliveryType(e.target.value)}
                        className="absolute opacity-0"
                      />
                      <div className="flex items-start space-x-4">
                        <span className="text-3xl">{option.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{option.name}</h3>
                          <p className="text-gray-600">{option.description}</p>
                          <div className="mt-2 flex items-center space-x-4">
                            <span className="text-sm font-semibold text-orange-600">
                              {option.time} delivery
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              {option.fee === 0 ? 'FREE' : `₦${option.fee.toLocaleString()}`}
                            </span>
                          </div>
                        </div>
                        {deliveryType === option.id && (
                          <CheckCircleIcon className="w-6 h-6 text-orange-600 flex-shrink-0" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </m.div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <m.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Payment Method</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="absolute opacity-0"
                      />
                      <div className="flex items-center space-x-3">
                        {typeof method.icon === 'string' ? (
                          <span className="text-2xl">{method.icon}</span>
                        ) : (
                          <method.icon className="w-8 h-8 text-gray-600" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{method.name}</h3>
                          <p className="text-xs text-gray-600">{method.description}</p>
                        </div>
                        {paymentMethod === method.id && (
                          <CheckCircleIcon className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Card Details (if card is selected) */}
                {paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4 p-6 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-900">Card Details</h3>
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                )}
              </m.div>
            )}

            {/* Step 4: Order Review */}
            {currentStep === 4 && (
              <m.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Review</h2>
                
                {/* Order Summary */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                    <h3 className="text-lg font-bold text-green-900">Ready to Place Order</h3>
                  </div>
                  <p className="text-green-800">
                    Please review your information below and click "Place Order" to complete your purchase.
                  </p>
                </div>

                {/* Shipping Address */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Shipping Address</h3>
                  <p className="text-gray-600 text-sm">
                    {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                </div>

                {/* Delivery Method */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Delivery Method</h3>
                  <p className="text-gray-600 text-sm">
                    {DELIVERY_OPTIONS.find(d => d.id === deliveryType)?.name} - {DELIVERY_OPTIONS.find(d => d.id === deliveryType)?.time}
                  </p>
                </div>

                {/* Payment Method */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Payment Method</h3>
                  <p className="text-gray-600 text-sm">
                    {PAYMENT_METHODS.find(p => p.id === paymentMethod)?.name}
                  </p>
                </div>
              </m.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₦45,000</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>
                    {DELIVERY_OPTIONS.find(d => d.id === deliveryType)?.fee === 0
                      ? 'FREE'
                      : `₦${DELIVERY_OPTIONS.find(d => d.id === deliveryType)?.fee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (7.5%)</span>
                  <span>₦3,375</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span className="text-orange-600">
                  ₦{(45000 + (DELIVERY_OPTIONS.find(d => d.id === deliveryType)?.fee || 0) + 3375).toLocaleString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentStep(Math.min(currentStep + 1, 4))}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
                >
                  {currentStep === 4 ? 'Place Order' : 'Continue'}
                </button>
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="w-full border-2 border-gray-300 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    Back
                  </button>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-3">Secure checkout powered by:</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>🔒 SSL Secure</span>
                  <span>✓ 100% Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
