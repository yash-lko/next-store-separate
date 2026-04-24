"use client";
import { FilterProps } from "@/types/products";

const Filter = ({ category, categories, onCategoryChange }: FilterProps) => {
    return (
        <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`px-3 py-1.5 cursor-pointer rounded-full text-xs font-semibold transition-all duration-200
                        ${category === cat
                            ? "bg-pink-500 text-white shadow-sm shadow-pink-200"
                            : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default Filter;
