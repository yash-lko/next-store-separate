"use client";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <div className="flex justify-center mb-4">
          <div className="bg-pink-50 p-3 rounded-full">
            <UserPlus className="w-7 h-7 text-pink-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900">Create an Account</h2>
        <p className="text-center text-gray-500 text-sm mt-1 mb-7">Register to get started</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-300 focus:border-transparent focus:outline-none transition bg-gray-50"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-300 focus:border-transparent focus:outline-none transition bg-gray-50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-300 focus:border-transparent focus:outline-none transition bg-gray-50"
              placeholder="••••••••"
            />
          </div>
          <button
            type="button"
            className="w-full bg-pink-500 text-white py-2.5 rounded-lg font-semibold hover:bg-pink-600 transition cursor-pointer mt-2"
          >
            Register
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-500 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
