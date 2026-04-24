import { Metadata } from "next";
import { ProductDetailsSlug, Product } from "@/types/products";
import BackButton from "@/components/BackButton";
import CartButton from "./CartButton";
import { notFound } from "next/navigation";
import { Star, Shield, Truck, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default async function ProductDetailsUI({ params }: { params: Promise<ProductDetailsSlug> }) {
  const product_slug = (await params).slug;

  let productDetails: Product | undefined;

  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products?limit=100`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: Product[] = await res.json();
    productDetails = data.find((b) => b.slug?.trim() === product_slug.trim());
  } catch {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 mt-12 text-center text-red-500">
        Something went wrong while loading this product.
      </div>
    );
  }

  if (!productDetails) {
    notFound();
  }

  const inrPrice = (productDetails.price * 90.5).toFixed(2);
  const originalPrice = (productDetails.price * 90.5 * 1.2).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-12">
      <BackButton />

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-10">
        {/* Image */}
        <div className="bg-white rounded-2xl shadow-sm p-8 flex items-center justify-center min-h-[380px] relative">
          <span className="absolute top-4 left-4 bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
            {productDetails.category?.name}
          </span>
          <img
            src={productDetails.images?.[0]}
            alt={productDetails.title}
            className="max-h-80 max-w-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            {productDetails.title}
          </h1>

          {/* Rating mock */}
          <div className="flex items-center gap-1 mt-2">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className={`w-4 h-4 ${i <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
            ))}
            <span className="text-xs text-gray-400 ml-1">(128 reviews)</span>
          </div>

          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            {productDetails.description}
          </p>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-3xl font-bold text-pink-600">₹{inrPrice}</span>
            <span className="text-base text-gray-400 line-through">₹{originalPrice}</span>
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">20% off</span>
          </div>

          <p className="text-xs text-green-600 mt-1 font-medium">Inclusive of all taxes</p>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-6 border rounded-xl p-4 bg-gray-50">
            <div className="flex flex-col items-center text-center gap-1">
              <Truck className="w-5 h-5 text-pink-500" />
              <span className="text-xs text-gray-600 font-medium">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <Shield className="w-5 h-5 text-pink-500" />
              <span className="text-xs text-gray-600 font-medium">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <RefreshCw className="w-5 h-5 text-pink-500" />
              <span className="text-xs text-gray-600 font-medium">Easy Returns</span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <CartButton product={productDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}
