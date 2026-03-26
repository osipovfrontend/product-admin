import type { Order } from '../types';

interface GetProductsParams {
    query?: string;
    skip: number;
    limit: number;
    order: Order;
    sortBy: string;
}

export const productsApi = {
    getProducts: async ({ query, skip, limit, order, sortBy }: GetProductsParams) => {
        const sortFieldMap: Record<string, string> = {
            'name': 'title',
            'brand': 'brand',
            'sku': 'sku',
            'rating': 'rating',
            'price': 'price',
        };

        const serverSortField = sortFieldMap[sortBy] || 'title';

        let url: string;
        if (query) {
            url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}&select=id,title,brand,sku,rating,price,thumbnail,category`;
        } else {
            url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=${serverSortField}&order=${order}&select=id,title,brand,sku,rating,price,thumbnail,category`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }

        return response.json();
    },

    addProduct: async (product: any) => {
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error('Ошибка при добавлении товара');
        }
        return response.json();
    },

    deleteProduct: async (id: number) => {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Ошибка при удалении товара ${id}`);
        }
        return response.json();
    },
};