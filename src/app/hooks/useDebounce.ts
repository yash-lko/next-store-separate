import { useEffect, useState } from "react";

export const useDebounce = (search: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(search);
        }, delay);
        return () => clearTimeout(timer);
    }, [search, delay]);

    return debouncedValue;
};
