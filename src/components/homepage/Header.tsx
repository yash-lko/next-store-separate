"use client"

import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SearchComp from "./Search";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export default function Header() {
    const { cart } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-sm fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/images/logo.png"
                        alt="NextStore logo"
                        width={120}
                        height={90}
                        className="object-contain"
                        priority
                    />
                </Link>

                <SearchComp />

                <div className="flex items-center gap-4">
                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen
                            ? <X className="w-6 h-6 text-gray-700" />
                            : <Menu className="w-6 h-6 text-gray-700" />
                        }
                    </button>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                        <Link href="/products" className="hover:text-pink-500 transition">Products</Link>
                        <Link href="/about" className="hover:text-pink-500 transition">About</Link>
                    </nav>

                    {/* Cart */}
                    <Link href="/cart" className="relative">
                        <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-pink-500 transition" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    <Link
                        href="/login"
                        className="hidden md:block px-4 py-1.5 bg-pink-500 text-white font-semibold rounded-full text-sm hover:bg-pink-600 transition"
                    >
                        Login
                    </Link>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
                    <div className="relative">
                        <SearchComp />
                    </div>
                    <Link href="/products" className="block text-sm font-medium text-gray-700 hover:text-pink-500 py-1" onClick={() => setMobileMenuOpen(false)}>Products</Link>
                    <Link href="/about" className="block text-sm font-medium text-gray-700 hover:text-pink-500 py-1" onClick={() => setMobileMenuOpen(false)}>About</Link>
                    <Link href="/login" className="block w-fit px-4 py-1.5 bg-pink-500 text-white font-semibold rounded-full text-sm" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                </div>
            )}
        </header>
    );
}
