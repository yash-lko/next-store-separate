"use client"
import { ShoppingCart, Star } from "lucide-react";
import { ProductCardProps } from "@/types/products";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    if (!product) return null;

    const inrPrice = (product.price * 90).toFixed(0);
    const originalPrice = (product.price * 90 * 1.2).toFixed(0);

    return (
        <div className="group bg-white rounded-2xl cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 hover:border-pink-100">
            <Link href={`products/${product.slug}`} className="relative block">
                <div className="h-48 w-full bg-gray-50 flex items-center justify-center overflow-hidden p-4">
                    <img
                        src={product?.images?.[0]}
                        alt={product.title}
                        className="max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <span className="absolute top-3 right-3 bg-white text-gray-500 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm border border-gray-100">
                    {product.category?.name?.split("-")[0]}
                </span>
            </Link>

            <div className="p-3 flex flex-col flex-1">
                <Link href={`products/${product.slug}`}>
                    <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 hover:text-pink-500 transition">
                        {product.title}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mt-1">
                    {[1,2,3,4].map(i => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                    <Star className="w-3 h-3 text-gray-200 fill-gray-200" />
                    <span className="text-[10px] text-gray-400 ml-1">(4.0)</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3">
                    <div>
                        <p className="text-base font-bold text-gray-900">₹{inrPrice}</p>
                        <p className="text-xs text-gray-400 line-through">₹{originalPrice}</p>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="p-2 rounded-full bg-pink-500 text-white cursor-pointer hover:bg-pink-600 active:scale-95 transition-all duration-150"
                        title="Add to cart"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
