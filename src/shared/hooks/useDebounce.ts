import { useEffect, useState } from 'react';

/**
 * Хук для дебаунса значения
 * @param value - значение для дебаунса
 * @param delay - задержка в миллисекундах
 * @returns дебаунснутое значение
 */

export const useDebounce = <T>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}