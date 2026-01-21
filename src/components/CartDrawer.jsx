import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { X, ShoppingCart } from 'lucide-react';

const CartDrawer = ({ open, onClose }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-60">
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" onClick={onClose} />

      <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl p-6 overflow-y-auto" role="dialog" aria-modal="true" aria-label="Shopping cart drawer">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2"><ShoppingCart className="w-5 h-5" /> Your Cart</h3>
          <button onClick={onClose} aria-label="Close cart drawer" className="p-2 rounded-md hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 text-gray-600">Your cart is empty</div>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.productId} className="flex items-center gap-4 border rounded-lg p-3">
                <img src={item.product?.image || '/placeholder.png'} alt="product" className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.product?.name || item.productId}</div>
                  <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                </div>
                <div className="text-sm font-bold">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format((item.product?.price || 0) * item.quantity)}</div>
                <div className="flex flex-col">
                  <button onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: Math.max(1, item.quantity - 1) }))} aria-label="Decrease quantity" className="p-1">-</button>
                  <button onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))} aria-label="Increase quantity" className="p-1">+</button>
                </div>
                <button onClick={() => dispatch(removeFromCart(item.productId))} aria-label="Remove item" className="p-1 text-red-600">Remove</button>
              </div>
            ))}

            <div className="pt-4 border-t flex items-center justify-between">
              <button onClick={() => dispatch(clearCart())} className="text-sm text-red-600">Clear cart</button>
              <a href="/checkout" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Checkout</a>
            </div>
          </div>
        )}
      </aside>
    </div>, document.body
  );
};

export default CartDrawer;
