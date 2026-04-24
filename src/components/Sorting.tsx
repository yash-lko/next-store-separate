"use client";
import { SortingProps, SortType } from "@/types/products";
import { ArrowUpDown } from "lucide-react";

const Sorting = ({ sort, onSortChange }: SortingProps) => {
    return (
        <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value as SortType)}
                className="border border-gray-200 cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 md:ml-auto"
            >
                <option value="default">Sort: Default</option>
                <option value="lowToHigh">Price: Low → High</option>
                <option value="highToLow">Price: High → Low</option>
            </select>
        </div>
    );
};

export default Sorting;
