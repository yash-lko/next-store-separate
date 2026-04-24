"use client"
import { useCart } from "../context/CartContext";
import Image from "next/image";
import SearchReset from "@/components/SearchReset";
import { Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const conversionRate = 90;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * conversionRate * item.quantity, 0);
  const savings = totalPrice * 0.1; // example 10% discount display

  if (cart.length === 0) {
    return (
      <>
        <SearchReset />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Image
            src="/images/empty-cart.jpg"
            width={340}
            height={260}
            alt="Empty Cart"
            className="opacity-90"
          />
          <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
          <Link
            href="/products"
            className="mt-2 px-6 py-2.5 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SearchReset />
      <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <ShoppingBag className="w-5 h-5 text-pink-500" />
            Your Cart
            <span className="text-sm font-normal text-gray-400 ml-1">({totalItems} items)</span>
          </h2>

          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-5 last:border-0">
                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{item.category?.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold text-pink-500">
                      ₹{(item.price * conversionRate).toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-pink-50 hover:border-pink-300 transition font-bold text-gray-600 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="font-semibold text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-pink-50 hover:border-pink-300 transition font-bold text-gray-600 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="font-bold text-gray-900 text-sm">
                    ₹{(item.price * conversionRate * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-pink-500 transition cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white p-6 rounded-2xl shadow h-fit sticky top-24">
          <h2 className="text-lg font-bold mb-5 text-gray-900">Price Details</h2>
          <div className="space-y-3 border-b pb-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Price ({totalItems} items)</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount (10%)</span>
              <span>− ₹{savings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
          </div>
          <div className="flex justify-between text-base font-bold mt-4 text-gray-900">
            <span>Total Amount</span>
            <span>₹{(totalPrice - savings).toFixed(2)}</span>
          </div>
          <p className="text-xs text-green-600 mt-1">You save ₹{savings.toFixed(2)} on this order</p>
          <button className="mt-5 w-full bg-pink-500 cursor-pointer text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition">
            Place Order
          </button>
          <Link href="/products" className="block text-center text-sm text-pink-500 hover:underline mt-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartPage;
