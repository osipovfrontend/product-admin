import type { Data } from '../types';

export const createData = (product: any): Data => ({
    id: product.id,
    name: product.title,
    category: product.category,
    brand: product.brand,
    sku: product.sku,
    rating: product.rating,
    price: product.price,
    thumbnail: product.thumbnail,
});