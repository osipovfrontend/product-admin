import { useState, useCallback, useEffect } from 'react';
import type { Data, Order } from '../types';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { productsApi } from '../api/productsApi';
import { createData } from '../lib/productUtils';

interface UseProductDataProps {
    rowsPerPage: number;
    order: Order;
    orderBy: keyof Data;
}

export const useProductData = ({ rowsPerPage, order, orderBy }: UseProductDataProps) => {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    const debouncedQuery = useDebounce(searchQuery, 500);

    const loadProducts = useCallback(async (query: string = '', skip: number = 0) => {
        setLoading(true);
        setError(null);

        try {
            const result = await productsApi.getProducts({
                query,
                skip,
                limit: rowsPerPage,
                order,
                sortBy: orderBy
            });

            const products = result.products.map(createData);
            setData(products);
            setTotalCount(result.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла ошибка');
            setData([]);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    }, [rowsPerPage, order, orderBy]);

    useEffect(() => {
        setPage(1);
    }, [debouncedQuery]);

    useEffect(() => {
        const skip = (page - 1) * rowsPerPage;
        loadProducts(debouncedQuery, skip);
    }, [page, rowsPerPage, debouncedQuery, order, orderBy, loadProducts]);

    return {
        data,
        loading,
        error,
        totalCount,
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        loadProducts
    };
};