"use client"
import { Search, X } from 'lucide-react'
import { useSearchStore } from '@/app/store/useSearchStore';
import { useDebounce } from '@/app/hooks/useDebounce';
import { useState, useEffect } from 'react';

const SearchComp = () => {
    const { setQuery } = useSearchStore();
    const [inputValue, setInputValue] = useState("");

    const debouncedValue = useDebounce(inputValue, 300);

    useEffect(() => {
        setQuery(debouncedValue);
    }, [debouncedValue, setQuery]);

    const handleClear = () => {
        setInputValue("");
        setQuery("");
    };

    return (
        <div className="hidden md:flex items-center flex-1 max-w-xl">
            <div className="w-full relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    name='search'
                    placeholder="Search for products..."
                    className="w-full rounded-full py-2 pl-4 pr-10 text-sm border border-gray-200 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
                />
                {inputValue ? (
                    <button onClick={handleClear} className="absolute right-3 top-2.5">
                        <X className="text-gray-400 w-5 h-5 hover:text-pink-500 transition" />
                    </button>
                ) : (
                    <Search className="absolute right-3 top-2.5 text-pink-500 w-5 h-5" />
                )}
            </div>
        </div>
    )
}

export default SearchComp;
